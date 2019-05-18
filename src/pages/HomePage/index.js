import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    Title,
    SubTitle,
    Input,
    Button,
    LoadingAnimation
} from '../../components/StyledComponents';

import '../../static/css/react-transition.css';

import { loadCorrectionsForSentence } from './actions';

const PrettyPrintJson = props => (
    <div
        className="alert alert-success"
        role="alert"
        style={{ marginTop: '30px' }}
    >
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
);

const ValidationError = () => (
    <div className="alert alert-danger m-b-26" role="alert">
        <h4 className="alert-heading m-b-8">Unsupported Input Format</h4>
        <p>
            Please note that only sentences with following characteristics are
            supported by the system currently.
            <ul className="m-l-10">
                <li>
                    - Should contain only sinhala unicode characters and ends
                    with a fullstop.
                </li>
                <li>
                    - Numbers and other punctuation marks are not supported yet.
                </li>
                <li>- No additional white spaces are supported.</li>
                <li>
                    - Only Sentence within word limit 3-7 are currently
                    supported.
                </li>
            </ul>
        </p>
        <hr />
        <p className="mb-0">E.g: ක්‍රීඩකයා ඉතා වේගයෙන් දිව්වේය.</p>
    </div>
);

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.onInputValueChange = this.onInputValueChange.bind(this);
        this.setSearchType = this.setSearchType.bind(this);
        this.getRequestBody = this.getRequestBody.bind(this);
        this.state = {
            inputSentence: '',
            searchType: 'greedy',
            requestingCorrections: false,
            showValidationError: false,
            mounted: false,
            randomList: [1, 2, 3]
        };
    }

    componentDidMount() {
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

    onAddition = e => {
        e.preventDefault();
        const list = this.state.randomList;
        const lastElement = list[list.length - 1];
        list.push(lastElement + 1);
        this.setState({ randomList: list });
    };

    getRequestBody = () => ({
        sentence: this.state.inputSentence,
        useBeamSearch: this.state.searchType === 'beem'
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
        let suggestions = null;

        if (initState === 'SUCCESS') {
            correctionData = this.props.correctionData;
        }

        suggestions = this.state.randomList.map(item => (
            <div className="p-t-26" key={item}>
                <div className="alert alert-danger m-b-0" role="alert">
                    <h4 className="alert-heading m-b-8">
                        මා විසින් ඇය ආරක්ෂා{' '}
                        <span
                            style={{
                                backgroundColor: '#e09c9c',
                                borderRadius: '5px',
                                height: '8px',
                                padding: '1px 2px'
                            }}
                        >
                            කෙරෙමි
                        </span>
                        .
                    </h4>
                    <hr />
                    <p className="mb-0">
                        Suggestion {item}: මා විසින් ඇය ආරක්ෂා කෙරෙයි.
                    </p>
                </div>
            </div>
        ));

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
                            {showValidationError && <ValidationError />}
                            <div>
                                <div>
                                    <Input
                                        placeholder="Enter the sentence here..."
                                        onChange={this.onInputValueChange}
                                        disabled={requestingCorrections}
                                    />
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: '20px'
                                        }}
                                    >
                                        <label
                                            htmlFor="greedyButton"
                                            className="radio-inline"
                                        >
                                            <input
                                                id="greedyButton"
                                                value="greedy"
                                                type="radio"
                                                name="optradio"
                                                onChange={this.setSearchType}
                                                defaultChecked={
                                                    searchType === 'greedy'
                                                }
                                                disabled={requestingCorrections}
                                            />
                                            Use Greedy Search
                                        </label>
                                        <label
                                            htmlFor="beemButton"
                                            className="radio-inline"
                                            style={{
                                                paddingLeft: '10px'
                                            }}
                                        >
                                            <input
                                                id="beemButton"
                                                value="beem"
                                                type="radio"
                                                name="optradio"
                                                onChange={this.setSearchType}
                                                defaultChecked={
                                                    searchType === 'beem'
                                                }
                                                disabled={requestingCorrections}
                                            />
                                            Use Beam Search
                                        </label>
                                    </div>
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
                                        <PrettyPrintJson
                                            data={correctionData}
                                        />
                                    </div>
                                )}
                                {/* <TransitionGroup
                                    transitionName="list-anim"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={300}
                                >
                                    {suggestions}
                                </TransitionGroup> */}
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
        results: PropTypes.array.isRequired,
        useBeamSearch: PropTypes.bool.isRequired
    }).isRequired,
    requestingCorrections: PropTypes.bool.isRequired
};

HomePage.defaultProps = {
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

const homePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export default homePage;
