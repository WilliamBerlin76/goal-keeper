import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import { getSteps } from '../../actions/index';

import Loader from '../loader/loader';
import StepForm from './stepForm';
import StepCard from './stepCard';

const mapState = (state: {
                    isFetching: boolean;
                    user: {
                        username: string;
                        id: number
                    };
                    stepList: {
                        goal: string
                        steps: Array<{
                            step_id: number;
                            name: string;
                            step_num: number;
                        }>
                    }

                }) => {
            return ({
                isFetching: state.isFetching,
                user: state.user,
                stepList: state.stepList
            });
};

const mapDispatch = { getSteps }

const connector = connect(mapState, mapDispatch);

interface RouterProps {
    goalId: string
};

interface StepProps extends RouteComponentProps<RouterProps>{};

type Props = ConnectedProps<typeof connector> & RouterProps & StepProps

const StepList: React.FC<Props> = ({ match, user, stepList, isFetching, getSteps}) => {

    const history = useHistory();

    useEffect(() => {
        getSteps(user.id, match.params.goalId)
    }, [getSteps, user.id, match.params.goalId]);

    return (
        <div className='main-comp-section'>
            <h2 className='back-click' onClick={() => history.goBack()}>Goal: {stepList.goal}</h2>
            <p>
                Below are the steps you will complete
                to achieve your goal: {stepList.goal}.
                You can add steps to this goal with the
                form below.
            </p>
            <StepForm
                goalId={match.params.goalId}
            />
            {stepList.steps && (
                stepList.steps.length === 0 ?
                    isFetching === true ? 
                    <Loader/>
                    :
                    <p>This goal doesn't have any steps yet!</p>
                :
                stepList.steps.map(step => {
                    return(
                        <StepCard 
                            key={step.step_id}
                            stepId={step.step_id}
                            name={step.name}
                            stepNum={step.step_num}
                        />
                    )
                })
            )}
        </div>
    );
};

export default connector(StepList);
