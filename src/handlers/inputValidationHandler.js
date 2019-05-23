import swal from 'sweetalert';

import { getSentencesFromText } from '../utils/stringUtils';

const MINIMUM_SENTENCE_WORD_LENGTH = 3;
const MAXIMUM_SENTENCE_WORD_LENGTH = 7;

const showValidationErrorAlert = (type, sentences) => {
    let errorTitle = '';
    let errorMessage = '';
    let errors = null;

    switch (type) {
    case 'EMPTY_INPUT':
        errorTitle = 'Your Input is Empty!';
        errorMessage = 'Please provide a valid input.';
        break;
    case 'NO_ENDING':
        errorTitle = 'Invalid Input!';
        errorMessage =
                'Please mark the end of sentence with valid punctuations.';
        break;
    case 'INVALID_CHARACTERS':
        errors = sentences.join('", \n"');
        errors = `"${errors}"`;
        errorTitle = 'Invalid Input!';
        errorMessage = `The following sentence(s) contains unsupported characters. \n ${errors}`;
        break;
    case 'INVALID_LENGTH':
        errors = sentences.join('", \n"');
        errors = `"${errors}"`;
        errorTitle = 'Invalid Input!';
        errorMessage = `The following sentence(s) contains unsupported sentence length. \n ${errors}`;
        break;
    default:
        errorTitle = 'Unsupported Input!';
        errorMessage =
                'The current system does not support your input format.';
        break;
    }

    swal({
        title: errorTitle,
        text: errorMessage,
        icon: 'warning',
        button: true
    });
};

const validateInputText = inputText => {
    if (typeof inputText !== 'string') {
        throw Error('Unsupported arguement. String expected.');
    }

    const validInputPattern = new RegExp('[^\u0D80-\u0DFF.\u200d ]');
    const endPattern = /([.!?])/i;

    const matched = endPattern.exec(inputText);
    const invalidSenteces = [];
    const invalidLengthSenteces = [];

    if (inputText === '') {
        showValidationErrorAlert('EMPTY_INPUT', null);
        return false;
    } else if (matched == null || matched.length === 0) {
        showValidationErrorAlert('NO_ENDING', null);
        return false;
    }

    const sentenceArray = getSentencesFromText(inputText);

    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 0; i < sentenceArray.length; i++) {
        if (validInputPattern.test(sentenceArray[i])) {
            invalidSenteces.push(sentenceArray[i]);
        }
        const splitSentence = sentenceArray[i].match(/\S+/g) || [];
        if (
            splitSentence.length < MINIMUM_SENTENCE_WORD_LENGTH ||
            splitSentence.length > MAXIMUM_SENTENCE_WORD_LENGTH
        ) {
            invalidLengthSenteces.push(sentenceArray[i]);
        }
    }

    if (invalidSenteces.length !== 0) {
        showValidationErrorAlert('INVALID_CHARACTERS', invalidSenteces);
        return false;
    } else if (invalidLengthSenteces.length !== 0) {
        showValidationErrorAlert('INVALID_LENGTH', invalidLengthSenteces);
        return false;
    }

    return true;
};

export { validateInputText };
