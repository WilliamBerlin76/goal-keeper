import React from "react"

import { useHistory } from "react-router-dom";

import './landing.scss';

const Landing: React.FC = () => {
    const history = useHistory();


    return (
        <section className='landing-page'>
            <div className='headline-container'>
                <h1>Set and Achieve your goals today.</h1>
                    <button 
                        className='sign-up-button'
                        onClick={() => history.push('/register')}
                    >Sign Up</button>
                    <br/>
                    <button 
                        className='sign-up-button'
                        onClick={() => history.push('/login')}
                    >Sign In</button>
            </div>
        </section>
    )
}

export default Landing;