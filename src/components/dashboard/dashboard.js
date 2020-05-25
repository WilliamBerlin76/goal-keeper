import React from 'react';

import { connect } from 'react-redux';

const Dashboard = props => {
    console.log(props.user)
    return (
        <h2>Hello {props.user.username}</h2>
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