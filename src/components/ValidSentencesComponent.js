import React from 'react';

const ValidSentencesComponent = () => (
    <div className="alert alert-secondary m-b-26" role="alert">
        <p>
            Please note that the current system only supports sentence(s) with
            following features.
        </p>
        <ul className="validation m-l-10">
            <li>
                - Should contain only sinhala unicode characters and ends with a
                fullstop.
            </li>
            <li>
                - Numbers and other punctuation marks are not supported yet.
            </li>
            <li>
                - Only Sentence within word limit 3-7 are currently supported.
            </li>
        </ul>
    </div>
);

export default ValidSentencesComponent;
