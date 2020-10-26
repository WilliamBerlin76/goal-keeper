import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteGoal, editGoal } from "../../actions/index";

import { connect, ConnectedProps } from "react-redux";

import "./goals.scss";

const mapState = (state: {
            user: {
              id: number;
            };
          }) => {
            return {
              user: state.user
            };
};

const mapDispatch = { deleteGoal, editGoal };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
  name: string;
  goalId: number;
};

interface nameTypes {
  name: string;
}

const GoalCard: React.FC<Props> = ({ user, goalId, name, deleteGoal, editGoal }) => {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [showPen, setShowPen] = useState<boolean>(false);
  const [newName, setNewName] = useState<nameTypes>({ name: name });
  const [displayName, setDisplayName] = useState<string>(name);
  const history = useHistory();

  useEffect(() => {
    setDisplayName(name);
  }, [name]);

  const bolden = (e: any) => {
    e.target.style.opacity = 1;
    e.target.style.cursor = "pointer";
  };
  const grey = (e: any) => {
    e.target.style.opacity = 0.3;
  };

  const handleChange = (e: any) => {
    setNewName({
      name: e.target.value,
    });
  };

  const handleDelete = (e: any) => {
    deleteGoal(user.id, goalId);
    setCanDelete(false);
  };

  const handleEdit = (e: any) => {
    editGoal(user.id, goalId, newName)
    setCanEdit(false);
  };

  const gotoSteps = (e: any) => {
    history.push(`/${goalId}/steps`)
  };

  return (
    <>
    <div
      onMouseOver={() => setShowPen(true)}
      onMouseLeave={() => setShowPen(false)}
      className="cards"
    >
      {canEdit ? (
        <div className='edit-form'>
          <input value={newName.name} name="name" onChange={handleChange} />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <span onClick={gotoSteps}>{displayName}</span>
      )}

      {showPen && (
        <div className="goal-buttons">
          <CreateTwoToneIcon
            opacity=".3"
            onMouseOver={bolden}
            onMouseLeave={grey}
            onClick={() => setCanEdit(!canEdit)}
          />
          <DeleteIcon
            opacity=".3"
            onMouseOver={bolden}
            onMouseLeave={grey}
            onClick={() => setCanDelete(!canDelete)}
          />
        </div>
      )}
    </div>
    {canDelete && (
      <div className='delete-confirm'>
        <p>Are you sure you want to delete this goal?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => setCanDelete(false)}>No</button>
      </div>
    )}
    </>
  );
};

export default connector(GoalCard);