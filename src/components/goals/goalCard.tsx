import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect, ConnectedProps } from 'react-redux';

const mapState = (state: {
                    user: {
                        id: number;
                    }; 
                }) => {
            return ({
                user: state.user,
        });
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & {
    name: string;
    goalId: number;
};

const GoalCard: React.FC<Props> = ({ name }) => {
    
    return(
        <div>
            <span>{name}</span>
        </div>
    )
};

export default connector(GoalCard);