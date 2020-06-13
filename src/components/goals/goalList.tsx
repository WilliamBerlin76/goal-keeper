import React, { useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import GoalForm from './goalForm';

import { getGoals } from '../../actions/index'; 

const mapState = (state: {
                    user: {
                        username: string;
                        id: number
                    }
                    goals: Array<{
                        id: number;
                        name: string
                    }>
                }) => {
            return ({
                user: state.user,
                goals: state.goals
        });
};    

const mapDispatch = { getGoals }

const connector = connect(mapState, mapDispatch);

interface RouterProps {
    catId: string;
};

interface GoalProps extends RouteComponentProps<RouterProps>{};

type Props = ConnectedProps<typeof connector> & RouterProps & GoalProps;

const GoalList: React.FC<Props> = ({ match, goals, user, getGoals }) => {
    
    useEffect(() => {
        getGoals(user.id, match.params.catId)
    }, [getGoals, user.id, match.params.catId])
    return (
        <>  
            <h2>Goals</h2>
            <GoalForm 
                catId={match.params.catId}
            />
            {goals.map(goal => {
                return (
                    <p key={goal.id}>{goal.name}</p>
                )
            })}
        </>
    )
};

export default connector(GoalList);