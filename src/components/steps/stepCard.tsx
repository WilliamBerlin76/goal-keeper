import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";

import { connect, ConnectedProps } from "react-redux";

import { removeStep, editStep } from '../../actions/index';

import "./steps.scss";

const mapState = (state: {
                    user: {
                        id: number;
                    }
                }) => {
                return {
                    user: state.user
                };
};

const mapDispatch = { removeStep, editStep };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
    stepId: number;
    name: string;
    stepNum: number;
};

interface nameTypes {
    name: string;
    stepNum: number
};

const StepCard: React.FC<Props> = ({ user, stepId, name, stepNum, removeStep, editStep }) => {
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [canDelete, setCanDelete] = useState<boolean>(false);
    const [showPen, setShowPen] = useState<boolean>(false);
    const [newStep, setStep] = useState<nameTypes>({ name, stepNum });
    const [displayStep, setDisplayStep] = useState<nameTypes>({ name, stepNum });
    // const history = useHistory();

    useEffect(() => {
        setDisplayStep({
            name: name,
            stepNum: stepNum
        });
    }, [name, stepNum]);

    const bolden = (e: any) => {
        e.target.style.opacity = 1;
        e.target.style.cursor = "pointer";
    };
      
    const grey = (e: any) => {
        e.target.style.opacity = 0.3;
    };

    const editStepChange = (e: any) => {
        setStep({
            ...newStep,
            [e.target.name]: e.target.value
        })
    };

    const handleDelete = (e: any) => {
        removeStep(user.id, stepId);
        setCanDelete(false)
    };

    const handleEdit = (e: any) => {
        editStep(user.id, stepId, newStep);
        setCanEdit(false);
    };

    return (
        <>
        <div 
            className='step-card'
            onMouseOver={() => setShowPen(true)}
            onMouseLeave={() => setShowPen(false)}
        >
            {canEdit ? (
                <div>
                    <input type='number' value={newStep.stepNum} name="stepNum" onChange={editStepChange}/>
                    <input value={newStep.name} name="name" onChange={editStepChange}/>
                    <button onClick={handleEdit}>Save</button>
                </div>
                ) : (
                <span>{displayStep.stepNum}. {displayStep.name}</span>
            )}
            {showPen && (
                <div className="goal-buttons">
                    <CreateTwoToneIcon
                        fontSize="small"
                        opacity=".3"
                        onMouseOver={bolden}
                        onMouseLeave={grey}
                        onClick={() => setCanEdit(!canEdit)}
                    />
                    <DeleteIcon
                        fontSize="small"
                        opacity=".3"
                        onMouseOver={bolden}
                        onMouseLeave={grey}
                        onClick={() => setCanDelete(!canDelete)}
                    />
                </div>
            )}
        </div>
        {canDelete && (
            <div>
                <p>Are you sure you want to delete this step?</p>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={() => setCanDelete(false)}>No</button>
            </div>
        )}
        </>
    )
};

export default connector(StepCard);