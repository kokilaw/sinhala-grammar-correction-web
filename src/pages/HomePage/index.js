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
import { copyTextToClipboard } from '../../handlers/textCopyHandler';
import ErrorSuggestions from '../../components/ErrorSuggestions';
import ValidSentencesComponent from '../../components/ValidSentencesComponent';

import { validateInputText } from '../../handlers/inputValidationHandler';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.onInputValueChange = this.onInputValueChange.bind(this);
        this.getRequestBody = this.getRequestBody.bind(this);
        this.state = {
            inputText: '',
            requestingCorrections: false,
            mounted: false,
            inputContainsErrors: false,
            noErrorsMessage: 'No grammartical errors found.',
            sentencesData: this.props.correctionData.sentences,
            heightToAnimate: 0
        };
    }

    componentDidMount() {
        document.title = 'Sinhala Grammar Tool';
        this.updateMountState();
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

    componentDidUpdate() {
        this.updateHeight();
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

        if (validateInputText(inputText)) {
            const requestBody = this.getRequestBody();
            this.setState(
                {
                    noErrorsMessage: 'No grammartical errors found.',
                    inputContainsErrors: false
                },
                () => {
                    checkGrammar(requestBody);
                }
            );
        } else {
            this.setState({
                inputContainsErrors: true
            });
        }
    };

    onCopyToClipboard = e => {
        e.preventDefault();
        const textInTextArea = this.state.inputText.trim();
        copyTextToClipboard(textInTextArea);
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
        this.setState({
            inputText: targetInputText,
            noErrorsMessage: 'No more grammartical errors found.'
        });
        this.updateStateAfterApplying(error);
    };

    updateHeight() {
        if (this.state.heightToAnimate !== this.div.scrollHeight)
            this.setState({ heightToAnimate: this.div.scrollHeight });
    }

    updateMountState = () => {
        this.setState({ mounted: true });
    };

    render() {
        const {
            requestingCorrections,
            mounted,
            inputContainsErrors,
            noErrorsMessage,
            heightToAnimate
        } = this.state;
        const { initState } = this.props;
        const currentHeight = heightToAnimate || 0;

        let containsErrors = false;
        let grammarChecked = false;

        if (initState === 'SUCCESS') {
            grammarChecked = true;
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
                            <ValidSentencesComponent />
                            <div className="height-change-div">
                                <div id="innerDiv">
                                    <div>
                                        <textarea
                                            className={`form-control ${inputContainsErrors &&
                                                'has-warning'} ${grammarChecked &&
                                                (containsErrors
                                                    ? 'has-error'
                                                    : 'has-success')} center-text`}
                                            placeholder="Enter the sentences here..."
                                            onChange={this.onInputValueChange}
                                            disabled={requestingCorrections}
                                            value={this.state.inputText}
                                        />
                                    </div>
                                    <div
                                        id="mainWrapper"
                                        style={{ height: `${currentHeight}px` }}
                                    >
                                        <div
                                            className="contentWrapper"
                                            ref={div => {
                                                this.div = div;
                                            }}
                                        >
                                            {initState !== 'LOADING' && (
                                                <div className="container">
                                                    <div className="row component-fade-in">
                                                        <div className="col-sm">
                                                            <Button
                                                                onClick={
                                                                    this
                                                                        .onSubmit
                                                                }
                                                                disabled={
                                                                    requestingCorrections
                                                                }
                                                                style={{
                                                                    marginTop:
                                                                        '26px',
                                                                    marginBottom:
                                                                        '0px',
                                                                    marginLeft:
                                                                        'auto'
                                                                }}
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
                                                                style={{
                                                                    marginTop:
                                                                        '26px',
                                                                    marginRight:
                                                                        'auto',
                                                                    marginBottom:
                                                                        '0px'
                                                                }}
                                                            >
                                                                Copy Text
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {initState === 'LOADING' && (
                                                <div
                                                    className="component-fade-in"
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
                                                <div className="component-fade-in">
                                                    <ErrorSuggestions
                                                        sentencesData={
                                                            this.state
                                                                .sentencesData
                                                        }
                                                        applySuggestion={
                                                            this
                                                                .applySuggestion
                                                        }
                                                    />
                                                </div>
                                            )}
                                            {initState === 'SUCCESS' &&
                                                !containsErrors && (
                                                <div className="p-t-30 component-fade-in">
                                                    <div
                                                        className="alert alert-success text-center"
                                                        role="alert"
                                                        style={{
                                                            marginBottom: `${0}rem`
                                                        }}
                                                    >
                                                        {noErrorsMessage}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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

const mapStateToProps = state => ({
    initState: (state.correctionsReducer || {}).status || '',
    correctionData: state.correctionsReducer.data,
    error: state.correctionsReducer.error,
    requestingCorrections: (state.correctionsReducer || {}).status === 'LOADING'
});

const mapDispatchToProps = dispatch => ({
    checkGrammar: request => dispatch(loadCorrectionsForSentence(request))
});

const homePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export default homePage;
