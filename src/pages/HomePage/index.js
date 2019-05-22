import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import swal from 'sweetalert';

import { loadCorrectionsForSentence } from './actions';

import '../../static/css/react-transition.css';

import {
    Title,
    Button,
    LoadingAnimation
} from '../../components/CommonStyledComponents';

import ErrorSuggestions from '../../components/ErrorSuggestions';
import DebugValidationError from '../../components/DebugValidationError';

import { validateInputText } from '../../utils/stringUtils';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.onInputValueChange = this.onInputValueChange.bind(this);
        this.getRequestBody = this.getRequestBody.bind(this);
        this.state = {
            inputText: '',
            searchType: 'greedy',
            requestingCorrections: false,
            showValidationError: false,
            mounted: false,
            validationErrorSentences: '',
            sentencesData: this.props.correctionData.sentences
        };
    }

    componentDidMount() {
        document.title = 'Sinhala Grammar Tool';
        this.setState({ mounted: true });
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.correctionData.sentences !== this.state.sentencesData) {
            this.setState({
                sentencesData: nextProps.correctionData.sentences
            });
        }
        if (
            nextProps.requestingCorrections !== this.state.requestingCorrections
        ) {
            this.setState({
                requestingCorrections: nextProps.requestingCorrections
            });
        }
    }

    onInputValueChange = e => {
        const rawValue = e.target.value;
        const validValue = rawValue.replace(/\s\./, `.`);
        this.setState({
            inputText: validValue
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const { checkGrammar } = this.props;
        const inputText = this.state.inputText.trim();
        const inputValidationErrors = validateInputText(inputText);

        if (
            inputValidationErrors !== true &&
            inputValidationErrors.length !== 0
        ) {
            let errors = inputValidationErrors.join('", "');
            errors = `"${errors}"`;
            this.setState({
                showValidationError: true,
                validationErrorSentences: errors
            });
            swal({
                title: 'Invalid Input!',
                text: 'Invalid input supplied. Please check again.',
                icon: 'warning',
                button: true
            });
        } else {
            this.setState({ showValidationError: false });
            const requestBody = this.getRequestBody();
            checkGrammar(requestBody);
        }
    };

    onCopyToClipboard = e => {
        e.preventDefault();
        const textInTextArea = this.state.inputText.trim();
        this.copyTextToClipboard(textInTextArea);
    };

    getRequestBody = () => {
        const inputText = this.state.inputText.trim();
        return {
            text: inputText,
            useBeamSearch: true,
            useNgramScore: true
        };
    };

    updateStateAfterApplying = sentence => {
        const remainingSentenceData = this.state.sentencesData.filter(
            sentenceData => sentenceData.sentence !== sentence
        );
        this.setState({ sentencesData: remainingSentenceData });
    };

    applySuggestion = (error, correction) => {
        const errorSentence = error.replace(/\s\./, `.`);
        const correctionSentence = correction.replace(/\s\./, `.`);

        const currentInputText = this.state.inputText;
        const targetInputText = currentInputText.replace(
            errorSentence,
            correctionSentence
        );
        this.setState({ inputText: targetInputText });
        this.updateStateAfterApplying(error);
    };

    fallbackCopyTextToClipboard = text => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log(`Fallback: Copying text command was ${msg}`);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    };
    copyTextToClipboard = text => {
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(
            () => {
                console.log('Async: Copying to clipboard was successful!');
                swal({
                    title: 'Successfully Coppied!',
                    text: 'Text coppied to the clipboard.',
                    icon: 'success',
                    timer: 2000,
                    button: false
                });
            },
            err => {
                console.error('Async: Could not copy text: ', err);
            }
        );
    };

    render() {
        const {
            requestingCorrections,
            showValidationError,
            mounted,
            height
        } = this.state;
        const { initState } = this.props;

        const currentHeight = height || 0;
        console.log(currentHeight);

        let containsErrors = false;

        if (initState === 'SUCCESS') {
            const sentences = this.state.sentencesData;
            const boolens = sentences.map(sentence => sentence.isCorrect);
            boolens.forEach(bool => {
                if (bool === false) {
                    containsErrors = true;
                }
            });
        }

        return (
            <div className="container-login100">
                <div className="wrap-login100">
                    <CSSTransition
                        in={mounted}
                        appear
                        timeout={500}
                        classNames="react-fade"
                    >
                        <form className="login100-form validate-form">
                            <Title className="p-b-26">
                                Sinhala Grammar Tool Beta
                            </Title>
                            {showValidationError && (
                                <DebugValidationError
                                    erroneousSentences={
                                        this.state.validationErrorSentences
                                    }
                                />
                            )}
                            <div className="height-change-div">
                                <div id="innerDiv">
                                    <div>
                                        <textarea
                                            className={`form-control ${showValidationError &&
                                                'error-border'}`}
                                            placeholder="Enter the sentences here..."
                                            onChange={this.onInputValueChange}
                                            disabled={requestingCorrections}
                                            value={this.state.inputText}
                                        />
                                    </div>
                                    {initState !== 'LOADING' && (
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm">
                                                    <Button
                                                        onClick={this.onSubmit}
                                                        disabled={
                                                            requestingCorrections
                                                        }
                                                    >
                                                        Check Grammar
                                                    </Button>
                                                </div>
                                                <div className="col-sm">
                                                    <Button
                                                        onClick={
                                                            this
                                                                .onCopyToClipboard
                                                        }
                                                        backgroundColor="#c6c8ca"
                                                        shadowColor="#d6d8d9"
                                                    >
                                                        Copy Text
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {initState === 'LOADING' && (
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                paddingTop: '26px'
                                            }}
                                        >
                                            <LoadingAnimation />
                                        </div>
                                    )}
                                    {initState === 'SUCCESS' &&
                                        containsErrors && (
                                        <ErrorSuggestions
                                            sentencesData={
                                                this.state.sentencesData
                                            }
                                            applySuggestion={
                                                this.applySuggestion
                                            }
                                        />
                                    )}
                                    {initState === 'SUCCESS' &&
                                        !containsErrors && (
                                        <div className="p-t-30 text-center">
                                            {' '}
                                                No grammartical errors found.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </CSSTransition>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    checkGrammar: PropTypes.func.isRequired,
    initState: PropTypes.string.isRequired,
    correctionData: PropTypes.shape({
        sentences: PropTypes.array,
        useBeamSearch: PropTypes.bool
    }),
    requestingCorrections: PropTypes.bool.isRequired
};

HomePage.defaultProps = {
    correctionData: {
        sentences: [],
        useBeamSearch: false
    }
};

const mapStateToProps = (state, ownProps) => ({
    initState: (state.correctionsReducer || {}).status || '',
    correctionData: state.correctionsReducer.data,
    error: state.correctionsReducer.error,
    requestingCorrections: (state.correctionsReducer || {}).status === 'LOADING'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    checkGrammar: request => dispatch(loadCorrectionsForSentence(request))
});

const homePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export default homePage;
