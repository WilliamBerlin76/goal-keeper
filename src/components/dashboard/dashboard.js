import React from 'react';

import { connect } from 'react-redux';

import CatForm from './catForm';

const Dashboard = props => {
    
    return (
        <>
            <h2>Hello {props.user.username}</h2>
            <CatForm />
        </>
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