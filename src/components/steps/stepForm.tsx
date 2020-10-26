import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Loader from '../loader/loader';

import { addStep } from '../../actions/index';

const mapState = (state: {
                    isPosting: boolean;
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

const mapDispatch = { addStep };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
    goalId: string
};

type stepTypes = {
    name: string;
    stepNum: number;
};

const StepForm: React.FC<Props> = ({user, goalId, addStep, isPosting}) => {
    const [step, setStep] = useState<stepTypes>({name: '', stepNum: NaN});
    const blockInvalidChar = (e: any) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

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
                onKeyDown={blockInvalidChar}
                onChange={e => {
                    setStep({
                        ...step,
                        stepNum: parseInt(e.target.value)
                })}}
            />
            {isPosting === true ? 
                <Loader />
                :
                <button 
                    onClick={handleSubmit} 
                    className='step-button'
                    disabled={step.name.length === 0 || isNaN(step.stepNum)}
                >Add Step</button>
            }
            
        </form>
    );
};

export default connector(StepForm);