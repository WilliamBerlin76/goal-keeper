import React, { useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import { getSteps } from '../../actions/index';

import StepForm from './stepForm';

const mapState = (state: {
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
                user: state.user,
                stepList: state.stepList
            })
};

const mapDispatch = { getSteps }

const connector = connect(mapState, mapDispatch);

interface RouterProps {
    goalId: string
}

interface StepProps extends RouteComponentProps<RouterProps>{};

type Props = ConnectedProps<typeof connector> & RouterProps & StepProps

const StepList: React.FC<Props> = ({ match, user, stepList, getSteps}) => {

    useEffect(() => {
        getSteps(user.id, match.params.goalId)
    }, [getSteps, user.id, match.params.goalId]);

    console.log(stepList)
    return (
        <>
            <h2>Goal: {stepList.goal}</h2>
            <StepForm
                goalId={match.params.goalId}
            />
            {stepList.steps && (
                stepList.steps.map(step => {
                    return(
                        <p key={step.step_id}>{step.step_num}. {step.name}</p>
                    )
                })
            )}
        </>
    );
};

export default connector(StepList)