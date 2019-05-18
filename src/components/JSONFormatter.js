import React from 'react';
import PropTypes from 'prop-types';

const JSONFormatter = ({ data }) => (
    <div
        className="alert alert-success"
        role="alert"
        style={{ marginTop: '30px' }}
    >
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
);

JSONFormatter.propTypes = {
    data: PropTypes.shape({}).isRequired
};

export default JSONFormatter;
