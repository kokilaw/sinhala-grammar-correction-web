import React from 'react';

const DebugValidationError = ({ erroneousSentences }) => (
    <div className="alert alert-danger m-b-26" role="alert">
        <p>
            Please note that only sentences with following characteristics are
            supported by the system currently.
        </p>
        <ul className="validation m-l-10">
            <li>
                - Should contain only sinhala unicode characters and ends with a
                fullstop.
            </li>
            <li>
                - Numbers and other punctuation marks are not supported yet.
            </li>
            <li>- No additional white spaces are supported.</li>
            <li>
                - Only Sentence within word limit 3-7 are currently supported.
            </li>
        </ul>

        <hr />
        <p className="mb-0">Invalid sentences found: {erroneousSentences}</p>
    </div>
);

export default DebugValidationError;
