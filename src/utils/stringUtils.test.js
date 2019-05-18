import {
    getSentencesFromText,
    decodeShortForms,
    encodeShortForms,
    validateInputSentence,
    validateInputText,
    removeSpaceBeforePunctuation,
    getErrorCorrection
} from './stringUtils';

it('Validation for minimum word length in a sentence', () => {
    expect(validateInputSentence('මම කමි.')).toEqual(false);
    expect(validateInputSentence('මම බත් කමි.')).toEqual(true);
});

it('Validation for maximum word length in a sentence', () => {
    expect(
        validateInputSentence('මම ඔබ සමඟ කතා කිරිමීට මෙතරම් දුරක් පැමිණියෙමි.')
    ).toEqual(false);
    expect(validateInputSentence('අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.')).toEqual(
        true
    );
});

it('Validation for unsupported characters in a sentence', () => {
    expect(validateInputSentence('මම asd කතා කිරිමීට පැමිණියෙමි.')).toEqual(
        false
    );
    expect(validateInputSentence('අපි  []/ හොඳින් සෙල්ලම් කළෙමු.')).toEqual(
        false
    );
    expect(validateInputSentence('අපි  454 හොඳින් සෙල්ලම් කළෙමු.')).toEqual(
        false
    );
});

it('Encoding the short forms of sinhala sentences', () => {
    expect(encodeShortForms('එස්. එම්. දිසානායක් සෙල්ලම් කළේය.')).toEqual(
        'ss mm දිසානායක් සෙල්ලම් කළේය.'
    );
    expect(encodeShortForms('මම පෙ.ව. එතනට පමිණියෙමි.')).toEqual(
        'මම pewa එතනට පමිණියෙමි.'
    );
    expect(encodeShortForms('මම ප.ව. එතනට පමිණියෙමි.')).toEqual(
        'මම pawa එතනට පමිණියෙමි.'
    );
});

it('Decoding the encoded short forms of sinhala sentences', () => {
    expect(decodeShortForms('ss mm දිසානායක් සෙල්ලම් කළේය.')).toEqual(
        'එස්. එම්. දිසානායක් සෙල්ලම් කළේය.'
    );
    expect(decodeShortForms('මම pewa එතනට පමිණියෙමි.')).toEqual(
        'මම පෙ.ව. එතනට පමිණියෙමි.'
    );
    expect(decodeShortForms('මම pawa එතනට පමිණියෙමි.')).toEqual(
        'මම ප.ව. එතනට පමිණියෙමි.'
    );
});

it('Splitting sentences from the given text', () => {
    expect(
        getSentencesFromText(
            'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු. අපි ඉතා හොඳින් සෙල්ලම් කළෙමු. අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.'
        )
    ).toEqual([
        'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.',
        'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.',
        'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.'
    ]);
    expect(
        getSentencesFromText(
            'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු! අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.'
        )
    ).toEqual([
        'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු!',
        'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.'
    ]);
    expect(
        getSentencesFromText(
            'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු? අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.'
        )
    ).toEqual([
        'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු?',
        'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.'
    ]);
});

it('Validating input text', () => {
    // valid scenario
    expect(
        validateInputText(
            'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු. අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.'
        )
    ).toEqual(true);
    // only one sentence is valid out of provided two
    expect(
        validateInputText(
            'අපි ඉතා හොඳින් asd සෙල්ලම් කළෙමු. අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.'
        )
    ).toEqual(['අපි ඉතා හොඳින් asd සෙල්ලම් කළෙමු.']);
    // sentences without proper punctuation ending
    expect(validateInputText('අපි ඉතා හොඳින් asd සෙල්ලම් කළෙමු')).toEqual([
        'අපි ඉතා හොඳින් asd සෙල්ලම් කළෙමු'
    ]);
    // multiple sentences with errors.
    expect(
        validateInputText(
            'අපි ඉතා හොඳින් 112 සෙල්ලම් කළෙමු. අපි ඉතා හොඳින් සෙල්ලම් කළෙමු. මම ඔබ සමඟ කතා කිරිමීට මෙතරම් දුරක් පැමිණියෙමි.මම ඔබ සමඟ කතා කිරිමීට මෙතරම් දුරක් පැමිණියෙමි.'
        )
    ).toEqual([
        'අපි ඉතා හොඳින් 112 සෙල්ලම් කළෙමු.',
        'මම ඔබ සමඟ කතා කිරිමීට මෙතරම් දුරක් පැමිණියෙමි.',
        'මම ඔබ සමඟ කතා කිරිමීට මෙතරම් දුරක් පැමිණියෙමි.'
    ]);
});

it('Removing space before the punctuation', () => {
    expect(
        removeSpaceBeforePunctuation('අපි ඉතා හොඳින් සෙල්ලම් කළෙමු .')
    ).toEqual('අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.');
    expect(
        removeSpaceBeforePunctuation('අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.')
    ).toEqual('අපි ඉතා හොඳින් සෙල්ලම් කළෙමු.');
});

it('Extracting corrections needed to be replaced with the correction', () => {
    expect(
        getErrorCorrection(
            'අපි ඉතා හොඳින් සෙල්ලම් කළෙමි .',
            'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු .'
        )
    ).toEqual([{ errorPhrase: 'කළෙමි', replacement: 'කළෙමු' }]);
    expect(
        getErrorCorrection(
            'අප ඉතා හොඳින් සෙල්ලම් කළෙමු .',
            'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු .'
        )
    ).toEqual([{ errorPhrase: 'අප', replacement: 'අපි' }]);
    expect(
        getErrorCorrection(
            'අප ඉතා හොඳින් සෙල්ලම් කළෙමි .',
            'අපි ඉතා හොඳින් සෙල්ලම් කළෙමු .'
        )
    ).toEqual([
        { errorPhrase: 'අප', replacement: 'අපි' },
        { errorPhrase: 'කළෙමි', replacement: 'කළෙමු' }
    ]);
    expect(
        getErrorCorrection(
            'අද ඉතා ඉක්මනින් මා පාසලට ගියෙමි.',
            'අද ඉතා ඉක්මනින් මම පාසලට ගියෙමි.'
        )
    ).toEqual([{ errorPhrase: 'මා', replacement: 'මම' }]);
    expect(
        getErrorCorrection(
            'අද ඉතා ඉක්මනින් මා පාසලට ගියෙමු.',
            'අද ඉතා ඉක්මනින් මම පාසලට ගියෙමි.'
        )
    ).toEqual([
        { errorPhrase: 'මා', replacement: 'මම' },
        { errorPhrase: 'ගියෙමු.', replacement: 'ගියෙමි.' }
    ]);
    expect(
        getErrorCorrection(
            'අද ඉතා ඉක්මනින් මම පාසලට ගියෙමි.',
            'අද ඉතා ඉක්මනින් මම පාසලට ගියෙමි.'
        )
    ).toEqual([]);
});
