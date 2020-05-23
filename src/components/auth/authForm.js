import React, { useState } from 'react';
import { connect } from 'react-redux';

import { authenticate } from '../../actions/index';

const AuthForm = props => {
    const [user, setUser] = useState({});

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        await props.authenticate(user, props.type);
        props.history.push('/dashboard')
    };

    return (
        <>
            <h2>{props.type}</h2>
            <form>
                <input
                    placeholder='Username'
                    type='text'
                    name='username'
                    onChange={handleChange}
                />
                {props.type === 'register' &&
                    <input
                        placeholder='Email'
                        type='text'
                        name='email'
                        onChange={handleChange}
                    />
                }
                <input
                    placeholder="Password"
                    type='password'
                    name='password'
                    onChange={handleChange}
                />
            </form>
            <button onClick={handleSubmit}>{props.type}</button>
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
    { authenticate }
)(AuthForm);