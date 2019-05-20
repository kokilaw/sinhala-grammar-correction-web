import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SubTitle } from './CommonStyledComponents';
import { getErrorCorrection } from '../utils/stringUtils';

const DisplayError = ({ words }) => (
    <h4 className="alert-heading m-b-8 center-text">
        {words.map((word, i) => (
            <span key={i}>{word}</span>
        ))}
    </h4>
);

DisplayError.propTypes = {
    words: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default class ErrorSuggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentencesData: this.props.sentencesData
        };
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.sentencesData !== this.state.sentencesData) {
            this.setState({
                sentencesData: nextProps.sentencesData
            });
        }
    }

    getErrorAnnotatedSentence = (sentenceData, replacements) => {
        const errornoesSentence = sentenceData.sentence.replace(/\s/g, ` - `);
        let words = errornoesSentence.split(' ');
        replacements.forEach(replacement => {
            const objectIndex = words.findIndex(
                obj => obj === replacement.errorPhrase
            );
            words[objectIndex] = (
                <span
                    style={{
                        backgroundColor: '#e09c9c',
                        borderRadius: '5px',
                        height: '8px',
                        padding: '1px 2px',
                        color: '#721c24'
                    }}
                >
                    {replacement.errorPhrase}
                </span>
            );
        });

        words = words.map(word => {
            if (word === '-') {
                return ' ';
            }
            return word;
        });

        return words;
    };

    render() {
        const relaventSentencesData = this.state.sentencesData.filter(
            sentenceData => sentenceData.isCorrect === false
        );

        return (
            <div>
                <SubTitle className="p-t-26">
                    Grammartical Errors Found
                </SubTitle>

                {relaventSentencesData.map((sentenceData, i) => {
                    const replacements = getErrorCorrection(
                        sentenceData.sentence,
                        sentenceData.results[0].suggestion
                    );
                    const errorAnnotatedSentence = this.getErrorAnnotatedSentence(
                        sentenceData,
                        replacements
                    );

                    return (
                        <div className="p-t-26" key={i}>
                            <div
                                className="alert alert-secondary m-b-0"
                                role="alert"
                            >
                                <DisplayError words={errorAnnotatedSentence} />
                                <p className="center-text">
                                    Suggestion :{' '}
                                    {sentenceData.results[0].suggestion}
                                </p>
                                <hr />
                                {replacements.map((replacement, i) => (
                                    <div
                                        className="apply-button"
                                        key={i}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => {
                                            this.props.applySuggestion(
                                                sentenceData.sentence,
                                                sentenceData.results[0]
                                                    .suggestion
                                            );
                                        }}
                                    >
                                        <p className="btnText">
                                            {replacement.errorPhrase} {'➡'}{' '}
                                            {replacement.replacement}
                                        </p>
                                        <div className="btnTwo">
                                            <p className="btnText2">Apply</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

ErrorSuggestions.propTypes = {
    sentencesData: PropTypes.arrayOf(PropTypes.any).isRequired,
    applySuggestion: PropTypes.func.isRequired
};
