import React from 'react';
import PropTypes from 'prop-types';

const SearchTypeRadioButtons = ({
    searchType,
    requestingCorrections,
    setSearchType,
    greedySearchLabel,
    beamSearchLabel
}) => (
    <div
        style={{
            textAlign: 'center',
            padding: '20px'
        }}
    >
        <label htmlFor="greedyButton" className="radio-inline">
            <input
                id="greedyButton"
                value="greedy"
                type="radio"
                name="optradio"
                onChange={setSearchType}
                defaultChecked={searchType === 'greedy'}
                disabled={requestingCorrections}
            />{' '}
            {greedySearchLabel}
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
                onChange={setSearchType}
                defaultChecked={searchType === 'beem'}
                disabled={requestingCorrections}
            />{' '}
            {beamSearchLabel}
        </label>
    </div>
);

SearchTypeRadioButtons.propTypes = {
    searchType: PropTypes.string.isRequired,
    requestingCorrections: PropTypes.bool.isRequired,
    setSearchType: PropTypes.func.isRequired,
    beamSearchLabel: PropTypes.string.isRequired,
    greedySearchLabel: PropTypes.string.isRequired
};

SearchTypeRadioButtons.defaultProps = {
    searchType: 'greedy'
};

export default SearchTypeRadioButtons;
