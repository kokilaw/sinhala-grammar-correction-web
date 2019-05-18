import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from './pages/HomePage/';
import HomePageDebug from './pages/HomePageDebug/';
import PageNotFound from './pages/PageNotFound/';

const App = ({ location }) => (
    <div className="limiter">
        <Switch>
            <Route location={location} exact path="/" component={HomePage} />
            <Route
                location={location}
                exact
                path="/debug"
                component={HomePageDebug}
            />
            <Route
                location={location}
                exact
                path="*"
                component={PageNotFound}
            />
        </Switch>
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
