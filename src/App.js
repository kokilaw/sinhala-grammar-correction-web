import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from './components/HomePage';

const App = ({ location }) => (
    <div className="limiter">
        <Route location={location} path="/" exact component={HomePage} />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
