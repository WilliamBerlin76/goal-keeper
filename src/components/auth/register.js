import React, { useState } from 'react';
import { connect } from 'react-redux';

import { register } from '../../actions/index';

const Register = props => {
    const [user, setUser] = useState({})

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        props.register(user)
    };

    return (
        <>
            <h2>Register</h2>
            <form>
                <input
                    placeholder='Username'
                    type='text'
                    name='username'
                    onChange={handleChange}
                />
                <input
                    placeholder='Email'
                    type='text'
                    name='email'
                    onChange={handleChange}
                />
                <input
                    placeholder="Password"
                    type='password'
                    name='password'
                    onChange={handleChange}
                />
            </form>
            <button onClick={handleSubmit}>Register</button>
        </>
    );
};

const mapStateToProps = state => {
    return{
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    { register }
)(Register)