import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";

import { connect, ConnectedProps } from "react-redux";

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

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & {
    stepId: number;
    name: string;
    stepNum: number;
};

interface nameTypes {
    name: string;
    stepNum: number
};

const StepCard: React.FC<Props> = ({ user, stepId, name, stepNum }) => {
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [canDelete, setCanDelete] = useState<boolean>(false);
    const [showPen, setShowPen] = useState<boolean>(false);
    const [newStep, setStep] = useState<nameTypes>({ name, stepNum });
    const [displayStep, setDisplayStep] = useState<nameTypes>({ name, stepNum });
    const history = useHistory();

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

    return (
        <>
        <div 
            className='step-card'
            onMouseOver={() => setShowPen(true)}
            onMouseLeave={() => setShowPen(false)}
        >
            {canEdit ? (
                <div>
                    <input value={newStep.stepNum} name="stepNum"/>
                    <input value={newStep.name} name="name"/>
                    <button>Save</button>
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
        </>
    )
};

export default connector(StepCard);