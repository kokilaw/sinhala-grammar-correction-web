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
    ' වයි.': 'yy',
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

export const getErrorCorrection = (inputSentence, predictedSentence) => {
    const splitInputSentence = inputSentence.split(' ');
    const splitPredictedSentence = predictedSentence.split(' ');

    const results = [];

    if (inputSentence === predictedSentence) {
        return results;
    }

    mainLoop: for (let i = 0; i < splitInputSentence.length; i++) {
        let tempErrorPhrase = '';
        let tempReplacement = '';

        for (let j = i; j < splitPredictedSentence.length; j++) {
            if (splitInputSentence[i] === splitPredictedSentence[j]) {
                continue mainLoop;
            } else {
                tempErrorPhrase = splitInputSentence[i];
                if (
                    splitInputSentence[i + 1] === splitPredictedSentence[j + 1]
                ) {
                    tempReplacement = splitPredictedSentence[j];
                    continue;
                }
            }
        }

        if (tempErrorPhrase !== '' || tempReplacement !== '') {
            results.push({
                errorPhrase: tempErrorPhrase,
                replacement: tempReplacement
            });
        }
    }

    return results;
};

// export const getErrorCorrectionTest = (inputSentence, predictedSentence) => {
//     const splitInputSentence = inputSentence.split(' ');
//     const splitPredictedSentence = predictedSentence.split(' ');

//     const results = [];

//     if (inputSentence === predictedSentence) {
//         return results;
//     }

//     const differentFromInput = arrayDifference(
//         splitInputSentence,
//         splitPredictedSentence
//     );
//     const differentFromPrediction = arrayDifference(
//         splitPredictedSentence,
//         splitInputSentence
//     );

//     console.log(differentFromInput);
//     console.log(differentFromPrediction);

//     return results;
// };
