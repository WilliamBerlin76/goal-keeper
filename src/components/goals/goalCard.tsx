import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteGoal } from "../../actions/index";

import { connect, ConnectedProps } from "react-redux";

import "./goals.scss";

const mapState = (state: {
            user: {
              id: number;
            };
          }) => {
            return {
              user: state.user,
            };
};

const mapDispatch = { deleteGoal }

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
  name: string;
  goalId: number;
};

interface nameTypes {
  name: string;
}

const GoalCard: React.FC<Props> = ({ user, goalId, name, deleteGoal }) => {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [showPen, setShowPen] = useState<boolean>(false);
  const [newName, setNewName] = useState<nameTypes>({ name: name });
  const [displayName, setDisplayName] = useState<string>(name);

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

  return (
    <>
    <div
      onMouseOver={() => setShowPen(true)}
      onMouseLeave={() => setShowPen(false)}
      className="goal-card"
    >
      {canEdit ? (
        <div>
          <input value={newName.name} name="name" onChange={handleChange} />
          <button>Save</button>
        </div>
      ) : (
        <span>{displayName}</span>
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
        <p>Are you sure you want to delete this goal?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => setCanDelete(false)}>No</button>
      </div>
    )}
    </>
  );
};

export default connector(GoalCard);