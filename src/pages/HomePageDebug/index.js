import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import ReactJson from 'react-json-view';

import {
    Title,
    SubTitle,
    Input,
    Button,
    LoadingAnimation
} from '../../components/CommonStyledComponents';
import SearchTypeRadioButtons from '../../components/SearchTypeRadioButtons';
import DebugValidationError from '../../components/DebugValidationError';

import '../../static/css/react-transition.css';

import { loadCorrectionsForSentence } from './actions';

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
            showValidationError: false,
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

        if (this.validateInput(this.state.inputSentence)) {
            this.setState({ showValidationError: false });
            const requestBody = this.getRequestBody();
            checkGrammar(requestBody);
        } else {
            this.setState({ showValidationError: true });
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

    validateInput = input => {
        const validInputPattern = new RegExp('[^\u0D80-\u0DFF.\u200d ]');
        const validateExtraSpaces = new RegExp('( +[.!?])');
        const splitSentence = input.match(/\S+/g) || [];
        return (
            !validInputPattern.test(input) &&
            !validateExtraSpaces.test(input) &&
            splitSentence.length >= 3 &&
            splitSentence.length <= 7
        );
    };

    render() {
        const {
            searchType,
            requestingCorrections,
            showValidationError,
            mounted
        } = this.state;
        const { initState } = this.props;

        let correctionData = {};

        if (initState === 'SUCCESS') {
            correctionData = this.props.correctionData;
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
                            {showValidationError && <DebugValidationError />}
                            <div>
                                <div>
                                    <Input
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
