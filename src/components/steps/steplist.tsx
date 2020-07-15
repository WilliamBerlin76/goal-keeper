import React, { useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

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

const connector = connect(mapState);

interface RouterProps {
    goalId: string
}

interface StepProps extends RouteComponentProps<RouterProps>{};

type Props = ConnectedProps<typeof connector> & RouterProps & StepProps

const StepList: React.FC<Props> = ({ match, user}) => {

    return (
        <>
            <h2>Steps go here</h2>
        </>
    )

}

export default connector(StepList)