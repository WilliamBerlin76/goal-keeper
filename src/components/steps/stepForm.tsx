import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { addStep } from '../../actions/index';

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

const mapDispatch = { addStep };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
    goalId: string
};

const StepForm: React.FC<Props> = ({user, goalId, addStep}) => {
    const [step, setStep] = useState<any>({})

    const handleSubmit = (e: any) => {
        addStep(user.id, goalId, step);
    };

    return(
        <>
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
            <button onClick={handleSubmit}>Add Step</button>
        </>
    );
};

export default connector(StepForm);