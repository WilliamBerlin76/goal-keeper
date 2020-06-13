import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { addGoal } from '../../actions/index';

const mapState = (state: {
                    user: {
                        id: number,
                        username: string
                    }
                }) => {
        return {
            user: state.user
        };
};

const mapDispatch = { addGoal };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
    catId: string
};

const GoalForm: React.FC<Props> = ({user, catId, addGoal}) => {
    const [goal, setGoal] = useState<object>({})

    const handleSubmit = (e: any) => {
        addGoal(user.id, catId, goal);
    };

    return(
        <>
            <input 
                placeholder='goal name'
                name='name'
                onChange={e => setGoal({name: e.target.value})}
            />
            <button onClick={handleSubmit}>Add Goal</button>
        </>
    );
};

export default connector(GoalForm);