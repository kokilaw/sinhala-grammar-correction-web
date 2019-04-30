import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// import HomePage from './components/HomePage';
import HomePageTemp from './components/HomePageTemp';

const App = ({ location }) => (
    <div className="limiter">
        {/* <Route location={location} path="/" exact component={HomePage} /> */}
        {/* <Route location={location} path="/" exact component={HomePageTemp} /> */}
        <HomePageTemp />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
