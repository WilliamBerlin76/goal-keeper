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
                            id: number;
                            name: string;
                            stepNum: number;
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
            <h2>Steps go here</h2>
            <StepForm
                goalId={match.params.goalId}
            />
            {stepList.steps && (
                stepList.steps.map(step => {
                    return(
                        <p>{step.name}</p>
                    )
                })
            )}
        </>
    );
};

export default connector(StepList)