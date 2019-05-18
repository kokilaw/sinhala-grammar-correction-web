const MINIMUM_SENTENCE_WORD_LENGTH = 3;
const MAXIMUM_SENTENCE_WORD_LENGTH = 7;

const pattern = /([.!?])/i;

const sinhalaShortForms = {
    'ඒ.': 'aa',
    'බී.': 'bb',
    'සී.': 'cc',
    'ඩී.': 'dd',
    'ඊ.': 'ee',
    'එෆ්.': 'ff',
    'ජී.': 'gg',
    'එච්.': 'hh',
    'අයි.': 'ii',
    'ජේ.': 'jj',
    'කේ.': 'kk',
    'එල්.': 'll',
    'එම්.': 'mm',
    'එන්.': 'nn',
    'ඕ.': 'oo',
    'පී.': 'pp',
    'කිව්.': 'qq',
    'ආර්.': 'rr',
    'එස්.': 'ss',
    'ටී.': 'tt',
    'යූ.': 'uu',
    'ඩබ්.': 'WW',
    'ඩබ්ලිව්.': 'ww',
    'එක්ස්.': 'xx',
    'වයි.': 'yy',
    'ඉසෙඩ්.': 'zz',
    'පෙ.': 'pe',
    'ව.': 'wa',
    'ප.': 'pa',
    'රු.': 'ru',
    '0.': '0dot',
    '1.': '1dot',
    '2.': '2dot',
    '3.': '3dot',
    '4.': '4dot',
    '5.': '5dot',
    '6.': '6dot',
    '7.': '7dot',
    '8.': '8dot',
    '9.': 'dot'
};

export const validateInputSentence = input => {
    if (typeof input !== 'string') {
        throw Error('Unsupported arguement. String expected.');
    }

    const validInputPattern = new RegExp('[^\u0D80-\u0DFF.\u200d ]');
    const validateExtraSpaces = new RegExp('( +[.!?])');
    const splitSentence = input.match(/\S+/g) || [];
    return (
        !validInputPattern.test(input) &&
        !validateExtraSpaces.test(input) &&
        splitSentence.length >= MINIMUM_SENTENCE_WORD_LENGTH &&
        splitSentence.length <= MAXIMUM_SENTENCE_WORD_LENGTH
    );
};

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export const encodeShortForms = inputText => {
    let encodeText = inputText;
    Object.keys(sinhalaShortForms).forEach(key => {
        encodeText = encodeText.replace(key, sinhalaShortForms[key]);
    });
    return encodeText;
};

export const decodeShortForms = encodedText => {
    let decodeText = encodedText;
    Object.values(sinhalaShortForms).forEach(value => {
        decodeText = decodeText.replace(
            value,
            getKeyByValue(sinhalaShortForms, value)
        );
    });
    return decodeText;
};

export const getSentencesFromText = text => {
    let encodedText = encodeShortForms(text);

    encodedText = encodedText.replace(/\./g, `.\t`);
    encodedText = encodedText.replace(/!/g, `!\t`);
    encodedText = encodedText.replace(/\?/g, `?\t`);

    const extractedEncodedSenteces = encodedText.split('\t');
    const filteredExtractedEncodedSenteces = extractedEncodedSenteces.filter(
        sentence => sentence !== ''
    );
    const decodedSentences = filteredExtractedEncodedSenteces.map(sentece =>
        decodeShortForms(sentece).trim()
    );

    return decodedSentences;
};

export const removeSpaceBeforePunctuation = prediction => {
    let text = prediction;

    text = text.replace(/\s\./g, `.`);
    text = text.replace(/\s!/g, `!`);
    text = text.replace(/\s\?/g, `?`);

    return text;
};

export const validateInputText = inputText => {
    if (typeof inputText !== 'string') {
        throw Error('Unsupported arguement. String expected.');
    }
    const matched = pattern.exec(inputText);

    if (matched == null || matched.length === 0) {
        return [inputText];
    }

    const sentenceArray = getSentencesFromText(inputText);
    const invalidSenteces = [];

    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 0; i < sentenceArray.length; i++) {
        if (!validateInputSentence(sentenceArray[i])) {
            invalidSenteces.push(sentenceArray[i]);
        }
    }

    if (invalidSenteces.length === 0) {
        return true;
    }

    return invalidSenteces;
};
