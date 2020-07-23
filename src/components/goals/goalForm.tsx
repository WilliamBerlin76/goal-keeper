import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Loader from '../loader/loader';

import { addGoal } from '../../actions/index';

const mapState = (state: {
                    isPosting: boolean
                    user: {
                        id: number,
                        username: string
                    }
                }) => {
        return {
            isPosting: state.isPosting,
            user: state.user
        };
};

const mapDispatch = { addGoal };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
    catId: string
};

const GoalForm: React.FC<Props> = ({user, catId, addGoal, isPosting}) => {
    const [goal, setGoal] = useState<object>({})

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addGoal(user.id, catId, goal);
    };

    return(
        <form className='add-forms'>
            <input 
                placeholder='goal name'
                name='name'
                onChange={e => setGoal({name: e.target.value})}
            />
            {isPosting === true ?
                <Loader />
                :
                <button onClick={handleSubmit}>Add Goal</button>
            }
            
        </form>
    );
};

export default connector(GoalForm);