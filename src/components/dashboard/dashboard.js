import React from 'react';

import { connect } from 'react-redux';

const Dashboard = props => {
    return (
        <h2>Hello {props.user.userName}</h2>
    )
};

const mapStateToProps = state => {
    return{
        user: state.user
    };
};

export default connect(
    mapStateToProps
)(Dashboard);