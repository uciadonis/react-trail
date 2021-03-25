import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Trails from './Trails';

const NotFound = () => (
    <div style={{margin: "0 px auto", textAlign: "center"}}>
        <h1>Page Not Found</h1>
        Upss you seem lost &nbsp; <br/>
        <Link to={Trails.Home.toUrl()}>
            &lt; Back to Home
        </Link>
    </div>
);

NotFound.propTypes = {
    message: PropTypes.string,
}

export default NotFound;