import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
    <div className="limiter">
        <div className="container-login100">
            <div className="wrap-login100">
                {' '}
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Oops! Nothing was found</h2>
                    <p>
                        The page you are looking for might have been removed had
                        its name changed or is temporarily unavailable.{' '}
                        <Link to="/">Return to homepage</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default PageNotFound;
