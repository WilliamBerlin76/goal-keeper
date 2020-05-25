import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import CatForm from './catForm';
import { getCats } from '../../actions/index';

const Dashboard = ({user, categories, getCats}) => {
    
    useEffect(() => {
        getCats(user.id)
    }, [getCats, user.id])

    return (
        <>
            <h2>Hello {user.username}</h2>
            <CatForm />
            <h3>categories</h3>
            {categories.map(cat => {
                return(
                <p key={cat.id}>{cat.name}</p>
                )
            })}
        </>
    )
};

const mapStateToProps = state => {
    return{
        user: state.user,
        categories: state.categories
    };
};

export default connect(
    mapStateToProps,
    { getCats }
)(Dashboard);