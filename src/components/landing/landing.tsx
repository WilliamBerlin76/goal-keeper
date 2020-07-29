import React from "react"

import { useHistory } from "react-router-dom";

import buildingPic from '../../assets/building.jpg';
import './landing.scss';

const Landing: React.FC = () => {
    return (
        <section className='landing-page'>
            <div className='headline-container'>
                <h1>Set and Achieve your goals today.</h1>
            </div>
        </section>
    )
}

export default Landing;