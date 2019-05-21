import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { loadCorrectionsForSentence } from './actions';

import '../../static/css/react-transition.css';

import {
    Title,
    Button,
    LoadingAnimation
} from '../../components/CommonStyledComponents';

import ErrorSuggestions from '../../components/ErrorSuggestions';
// import SearchTypeRadioButtons from '../../components/SearchTypeRadioButtons';
// import JSONFormatter from '../../components/JSONFormatter';
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
        this.setState({ mounted: true });
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.correctionData.sentences !== this.state.sentencesData) {
            this.setState({
                sentencesData: nextProps.correctionData.sentences
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
        } else {
            this.setState({ showValidationError: false });
            const requestBody = this.getRequestBody();
            checkGrammar(requestBody);
        }
    };

    getRequestBody = () => {
        const inputText = this.state.inputText.trim();
        return {
            text: inputText,
            useBeamSearch: this.state.searchType === 'beem'
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
                                            className="input-area"
                                            placeholder="Enter the sentences here..."
                                            onChange={this.onInputValueChange}
                                            disabled={requestingCorrections}
                                            value={this.state.inputText}
                                        />
                                    </div>
                                    {initState !== 'LOADING' && (
                                        <Button
                                            onClick={this.onSubmit}
                                            disabled={requestingCorrections}
                                        >
                                            Check Grammar
                                        </Button>
                                    )}
                                    {initState === 'LOADING' && (
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                paddingTop: '40px'
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
                                                Your grammar seems accurate and
                                                correct...
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
