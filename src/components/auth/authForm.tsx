import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from "react-router-dom";

import { authenticate } from '../../actions/index';

import Loader from '../loader/loader';

import './authForm.scss';

const mapState = (state: { user: object; error: string; isPosting: boolean }) => {
    return{
        isPosting: state.isPosting,
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

type userTypes = {
    username: string;
    email: string;
    password: string;
}

const AuthForm: React.FC<Props> = ({ authenticate, type, error, isPosting }) => {
    const [user, setUser] = useState<userTypes>({
                                                    username: '',
                                                    email: '',
                                                    password: ''
                                                });
    const [remember, setRemember] = useState<boolean>(false);
    const [usernameErr, setUserNameErr] = useState<boolean>(false);
    const [emailErr, setEmailErr] = useState<boolean>(false);
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
    const [passwordErr, setPasswordErr] = useState<boolean>(false);
    const history = useHistory();
    const emailReg = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        if (user.username){
            setUserNameErr(false);
        } 
        if (user.email && type === 'Register'){
            setEmailErr(false);
        } 
        if (emailReg.test(user.email) && type === 'Register'){
            setInvalidEmail(false);
        } 
        if (user.password){
            setPasswordErr(false);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!user.username){
            setUserNameErr(true);
        } 
        if (!user.email && type === 'Register'){
            setEmailErr(true);
        } 
        if (!emailReg.test(user.email) && type === 'Register'){
            setInvalidEmail(true);
        } 
        if (!user.password){
            setPasswordErr(true);
        }
        if (type === "Register") {
            if (user.username && user.email && emailReg.test(user.email) && user.password){
                await authenticate(user, type, remember);
                history.push('/dashboard');
            } 
        } else {
            if (user.username && user.password){
                await authenticate(user, type, remember);
                history.push('/dashboard');
            }
        };
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
                {usernameErr && (
                    <span className='auth-err'>Must submit a username</span>
                )}
                {type === 'Register' && 
                    <input
                        placeholder='Email'
                        type='text'
                        name='email'
                        onChange={handleChange}
                    />
                }
                {emailErr && (
                    <span className='auth-err'>Must submit an email</span>
                )}
                {invalidEmail && (
                    <span className='auth-err'>Email is invalid</span>
                )}
                <input
                    placeholder="Password"
                    type='password'
                    name='password'
                    onChange={handleChange}
                />
                {passwordErr && (
                    <span className='auth-err'>Must submit a password</span>
                )}
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
                {isPosting === true ?
                    <div className='center-load'>
                        <Loader />
                    </div>
                    :
                    <button className='auth-submit'>{type}</button>
                }
                
            </form>  
        </section>
    );
};


export default connector(AuthForm);