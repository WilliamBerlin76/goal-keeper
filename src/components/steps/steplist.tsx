import React, { useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import { getSteps } from '../../actions/index';

const mapState = (state: {
                    user: {
                        username: string;
                        id: number
                    };

                }) => {
            return ({
                user: state.user,
            })
};

const mapDispatch = { getSteps }

const connector = connect(mapState, mapDispatch);

interface RouterProps {
    goalId: string
}

interface StepProps extends RouteComponentProps<RouterProps>{};

type Props = ConnectedProps<typeof connector> & RouterProps & StepProps

const StepList: React.FC<Props> = ({ match, user, getSteps}) => {

    useEffect(() => {
        getSteps(user.id, match.params.goalId)
    }, [getSteps, user.id, match.params.goalId])
    return (
        <>
            <h2>Steps go here</h2>
        </>
    )

}

export default connector(StepList)