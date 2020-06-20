import React, { useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import GoalForm from './goalForm';
import GoalCard from './goalCard';

import { getGoals } from '../../actions/index'; 

const mapState = (state: {
                    user: {
                        username: string;
                        id: number;
                    }
                    goals: {
                        category: string
                        goals: Array<{
                            id: number;
                            name: string;
                        }>
                    }
                }) => {
            return ({
                user: state.user,
                goals: state.goals,
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
    console.log(goals)
    useEffect(() => {
        getGoals(user.id, match.params.catId)
    }, [getGoals, user.id, match.params.catId])
    return (
        <>  
            <h2>Goals: {goals.category}</h2>
            <GoalForm 
                catId={match.params.catId}
            />
            {goals.goals && (
                goals.goals.map(goal => {
                    return (
                        <GoalCard
                            key={goal.id}
                            goalId={goal.id} 
                            name={goal.name}
                        />
                    )
                })
            )}
        </>
    )
};

export default connector(GoalList);