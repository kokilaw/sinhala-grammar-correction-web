import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import ReactJson from 'react-json-view';

import {
    Title,
    SubTitle,
    Button,
    LoadingAnimation
} from '../../components/CommonStyledComponents';
import SearchTypeRadioButtons from '../../components/SearchTypeRadioButtons';
import ValidSentencesComponent from '../../components/ValidSentencesComponent';

import '../../static/css/react-transition.css';

import { loadCorrectionsForSentence } from './actions';
import { validateInputText } from '../../handlers/inputValidationHandler';

class HomePageDebug extends React.Component {
    constructor(props) {
        super(props);
        this.onInputValueChange = this.onInputValueChange.bind(this);
        this.setSearchType = this.setSearchType.bind(this);
        this.getRequestBody = this.getRequestBody.bind(this);
        this.state = {
            inputSentence: '',
            searchType: 'beemNgram',
            requestingCorrections: false,
            inputContainsErrors: false,
            mounted: false,
            randomList: [1, 2, 3]
        };
    }

    componentDidMount() {
        document.title = 'Sinhala Grammar Tool - Debug';
        this.setState({ mounted: true });
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (
            nextProps.requestingCorrections !== this.state.requestingCorrections
        ) {
            this.setState({
                requestingCorrections: nextProps.requestingCorrections
            });
        }
    }

    onInputValueChange = e => {
        this.setState({
            inputSentence: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const { checkGrammar } = this.props;

        if (validateInputText(this.state.inputSentence)) {
            this.setState({ inputContainsErrors: false });
            const requestBody = this.getRequestBody();
            checkGrammar(requestBody);
        } else {
            this.setState({ inputContainsErrors: true });
        }
    };

    getRequestBody = () => ({
        sentence: this.state.inputSentence,
        useBeamSearch:
            this.state.searchType === 'beem' ||
            this.state.searchType === 'beemNgram',
        useNgramScore: this.state.searchType === 'beemNgram'
    });

    setSearchType = e => {
        this.setState({
            searchType: e.target.value
        });
    };

    render() {
        const {
            searchType,
            requestingCorrections,
            inputContainsErrors,
            mounted
        } = this.state;
        const { initState } = this.props;

        let correctionData = {};
        let containsErrors = false;
        let grammarChecked = false;

        if (initState === 'SUCCESS') {
            correctionData = this.props.correctionData;
            console.log(correctionData);
            containsErrors = !correctionData.isCorrect;
            grammarChecked = true;
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
                            <div>
                                <div>
                                    <input
                                        className={`form-control ${inputContainsErrors &&
                                            'has-warning'} ${grammarChecked &&
                                            (containsErrors
                                                ? 'has-error'
                                                : 'has-success')} center-text`}
                                        placeholder="Enter the sentence here..."
                                        onChange={this.onInputValueChange}
                                        disabled={requestingCorrections}
                                    />
                                    <SearchTypeRadioButtons
                                        beamSearchLabel="Beam"
                                        greedySearchLabel="Greedy"
                                        beemNgramSearchLabel="Beam + Ngram"
                                        searchType={searchType}
                                        requestingCorrections={
                                            requestingCorrections
                                        }
                                        setSearchType={this.setSearchType}
                                    />
                                </div>
                                {initState !== 'LOADING' && (
                                    <Button
                                        onClick={this.onSubmit}
                                        style={{
                                            marginTop: '26px',
                                            marginRight: 'auto',
                                            marginBottom: '0px',
                                            marginLeft: 'auto'
                                        }}
                                        disabled={requestingCorrections}
                                    >
                                        Check Grammar
                                    </Button>
                                )}
                                {initState === 'LOADING' && (
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            paddingTop: '20px'
                                        }}
                                    >
                                        <LoadingAnimation />
                                    </div>
                                )}
                                {initState === 'SUCCESS' && (
                                    <div>
                                        <SubTitle className="p-t-26">
                                            Suggestions
                                        </SubTitle>
                                        {/* <JSONFormatter data={correctionData} /> */}
                                        <div
                                            className="m-t-26"
                                            style={{
                                                padding: '26px',
                                                borderRadius: '5px',
                                                backgroundColor: '#d4edda'
                                            }}
                                        >
                                            <ReactJson
                                                src={correctionData}
                                                displayDataTypes={false}
                                                enableClipboard={false}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </CSSTransition>
                </div>
            </div>
        );
    }
}

HomePageDebug.propTypes = {
    checkGrammar: PropTypes.func.isRequired,
    initState: PropTypes.string.isRequired,
    correctionData: PropTypes.shape({
        results: PropTypes.array.isRequired,
        useBeamSearch: PropTypes.bool.isRequired
    }).isRequired,
    requestingCorrections: PropTypes.bool.isRequired
};

HomePageDebug.defaultProps = {
    correctionData: {
        results: [],
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

const homePageDebug = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePageDebug);

export default homePageDebug;
