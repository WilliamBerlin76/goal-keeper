import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Loader from '../loader/loader';

import { addStep } from '../../actions/index';

const mapState = (state: {
                    isFetching: boolean;
                    user: {
                        id: number,
                        username: string
                    }
                }) => {
        return {
            isFetching: state.isFetching,
            user: state.user
        };
};

const mapDispatch = { addStep };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
    goalId: string
};

const StepForm: React.FC<Props> = ({user, goalId, addStep, isFetching}) => {
    const [step, setStep] = useState<any>({})

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addStep(user.id, goalId, step);
    };

    return(
        <form className='add-forms'>
            <input 
                placeholder='step name'
                name='name'
                onChange={e => setStep({
                    ...step, 
                    name: e.target.value
                })}
            />
            <input 
                type='number'
                placeholder='step number'
                name='stepNum'
                onChange={e => setStep({
                    ...step,
                    stepNum: e.target.value
                })}
            />
            {isFetching === true ? 
                <Loader />
                :
                <button onClick={handleSubmit}>Add Step</button>
            }
            
        </form>
    );
};

export default connector(StepForm);