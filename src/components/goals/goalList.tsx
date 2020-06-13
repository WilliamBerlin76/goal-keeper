import React, { useState } from 'react';
import { RouteComponentProps } from "react-router-dom";

import GoalForm from './goalForm';

const mapState = (state: {
                    goals: Array<{
                        id: number;
                        name: string
                    }>
                }) => {
            return ({
                goals: state.goals
        })
};           


interface RouterProps {
    catId: string;
};

interface GoalProps extends RouteComponentProps<RouterProps>{};

const GoalList: React.FC<GoalProps> = ({ match }) => {
    console.log(match.params.catId)
    return (
        <>  
            <h2>Goals</h2>
            <GoalForm 
                catId={match.params.catId}
            />
        </>
    )
};

export default GoalList;