import React from 'react';
import styled from 'styled-components';

import { insertToArray } from '../utils';

const Title = styled.span`
    display: block;
    font-family: Poppins-Bold;
    font-size: 30px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
`;

const ErrorLine = styled.mark`
    color: transparent;
    background-color: transparent;
    border-bottom: 3px solid #d1111748;
    padding: 0px;
`;

const Button = styled.button`
    display: block;
    width: 200px;
    margin: 30px auto 0;
    padding: 10px;
    border: none;
    border-radius: 25px;
    color: #fff;
    background-color: #58b846;
    font: 15px Poppins-Medium;
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: 1px;
    appearance: none;
    cursor: pointer;
    transition: all 0.4s;
    &:hover {
        box-shadow: 0 0.5em 0.5em -0.4em #8fc866;
        transform: translateY(-0.25em);
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(68, 68, 68, 0.137);
    }
`;

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.onTextAreaValueChange = this.onTextAreaValueChange.bind(this);
        this.state = {
            text:
                'ඇය මට ගිය සතියේ ලියුමක් එව්වේය. මා ඇය හට එය සඳහා පිළිතුරක් කෑවාය.',
            sentences: [
                {
                    original: 'ඇය මට ගිය සතියේ ලියුමක් එව්වේය.',
                    correction: 'ඇය මට ගිය සතියේ ලියුමක් එව්වාය.'
                },
                {
                    original: 'මා ඇය හට එය සඳහා පිළිතුරක් කෑවේය.',
                    correction: 'මා ඇය හට එය සඳහා පිළිතුරක් කෑවාය.'
                }
            ]
        };
    }

    onTextAreaValueChange = e => {
        this.setState({
            text: e.target.value,
            errorPrompt: this.appendErrors(e.target.value)
        });
    };

    getWordWithError = pair => {
        const orginalSplit = pair.original.split(' ');
        const correctionSplit = pair.correction.split(' ');

        if (orginalSplit.length !== correctionSplit.length) {
            throw new Error(
                'Lengths of the original sentence and correction is not the same'
            );
        }

        this.errorWord = '';

        for (let i = 0; i < orginalSplit.length; i += 1) {
            if (orginalSplit[i] !== correctionSplit[i]) {
                this.errorWord = orginalSplit[i];
            }
        }

        return this.errorWord;
    };

    appendErrors = sentences => {
        const sentecesWithError = sentences.map(sentencePair => {
            const pair = {
                sentence: sentencePair.original,
                errorWord: this.getWordWithError(sentencePair)
            };

            return pair;
        });

        const sentenceElements = sentecesWithError.map(sentence => {
            let splitSentence = sentence.sentence.split(sentence.errorWord);
            splitSentence = insertToArray(
                splitSentence,
                1,
                <ErrorLine>sentence.errorWord</ErrorLine>
            );
            return splitSentence;
        });

        return sentenceElements;
    };

    render() {
        const { text, sentences } = this.state;
        const sentencesWithErrorWord = this.appendErrors(sentences);
        console.log(sentencesWithErrorWord);

        return (
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <Title className="p-b-26">Sinhala Grammar Tool</Title>
                        <div>
                            <div className="textarea-container">
                                <textarea
                                    defaultValue={text}
                                    placeholder="Insert the sentences here..."
                                    onChange={this.onTextAreaValueChange}
                                />
                                <div className="backdrop">
                                    <div className="highlights">
                                        {sentencesWithErrorWord[1]}
                                    </div>
                                </div>
                            </div>
                            <Button>Check Grammar</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
