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
    const [nameErr, setNameErr] = useState<boolean>(false);
    const [numErr, setNumErr] = useState<boolean>(false);
    const blockInvalidChar = (e: any) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!step.name){
            setNameErr(true);
        } else if (typeof step.stepNum !== "number" || isNaN(step.stepNum)){
            setNumErr(true);
        } else {
            setNameErr(false);
            setNumErr(false);
            addStep(user.id, goalId, step);
        }
        
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
            {nameErr && <p className='auth-err'>you must submit a step name</p>}
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
            {numErr && <p className='auth-err'>the step number must be a number</p>}
            {isPosting === true ? 
                <Loader />
                :
                <button onClick={handleSubmit} className='step-button'>Add Step</button>
            }
            
        </form>
    );
};

export default connector(StepForm);