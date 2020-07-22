import React, { useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import Loader from '../loader/loader';
import GoalForm from './goalForm';
import GoalCard from './goalCard';

import { getGoals } from '../../actions/index'; 

const mapState = (state: {
                    isFetching: boolean;
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
                isFetching: state.isFetching,
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

const GoalList: React.FC<Props> = ({ match, goals, user, isFetching, getGoals }) => {

    useEffect(() => {
        getGoals(user.id, match.params.catId)
    }, [getGoals, user.id, match.params.catId]);
    
    return (
        <section className='main-comp-section'>  
            <h2>Category: {goals.category}</h2>

            <p>
                Here are your goals for the 
                category: {goals.category}.
                You can type and enter in the
                form below to add a goal.
            </p>
            <GoalForm 
                catId={match.params.catId}
            />
            {goals.goals && (
                goals.goals.length === 0 ? 
                    isFetching === true ? 
                    <Loader/>
                    :
                    <p>This category doesn't have any goals!</p>
                    :
                <>
                    <p>(click a goal to view steps)</p>
                    {goals.goals.map(goal => {
                        return (
                            <GoalCard
                                key={goal.id}
                                goalId={goal.id} 
                                name={goal.name}
                            />
                        )
                    })}
                </>
            )}
        </section>
    );
};

export default connector(GoalList);