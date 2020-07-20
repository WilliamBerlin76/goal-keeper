import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from "react-router-dom";

import { authenticate } from '../../actions/index';

import './authForm.scss';

const mapState = (state: { user: object; error: string; }) => {
    return{
        user: state.user,
        error: state.error
    };
};

const mapDispatch = {
    authenticate
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    type: string,
};

const AuthForm: React.FC<Props> = ({authenticate, type, error}) => {
    const [user, setUser] = useState<object>({});
    const [remember, setRemember] = useState<boolean>(false);
    const history = useHistory();
    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await authenticate(user, type, remember);
        history.push('/dashboard');
    };

    return (
        <section className='auth-form-container'>
            
            <form
                onSubmit={handleSubmit}
                className='auth-form'
            >
                <h2>{type}</h2>
                <input
                    placeholder='Username'
                    type='text'
                    name='username'
                    onChange={handleChange}
                />
                {type === 'Register' &&
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
                <div className='remember-check'>
                    <input 
                        id='remember'
                        type="checkbox"
                        onChange={() => setRemember(!remember)}
                    />
                    <label htmlFor='remember'>Remember me?</label>
                </div>
                {error && (
                    <p className='auth-err'>{error}</p>
                )}
                <button className='auth-submit'>{type}</button>
            </form>  
        </section>
    );
};


export default connector(AuthForm);