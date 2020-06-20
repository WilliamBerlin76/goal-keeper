import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";

import { connect, ConnectedProps } from "react-redux";

import './goals.scss';

const mapState = (state: {
  user: {
    id: number;
  };
}) => {
  return {
    user: state.user,
  };
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & {
  name: string;
  goalId: number;
};

interface nameTypes {
  name: string;
}

const GoalCard: React.FC<Props> = ({ name }) => {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [showPen, setShowPen] = useState<boolean>(false);
  const [newName, setNewName] = useState<nameTypes>({ name: name });
  const [displayName, setDisplayName] = useState<string>(name);

  const bolden = (e: any) => {
    e.target.style.opacity = 1;
    e.target.style.cursor = "pointer";
  };
  const grey = (e: any) => {
    e.target.style.opacity = 0.3;
  };

  return (
    <div
      onMouseOver={() => setShowPen(true)}
      onMouseLeave={() => setShowPen(false)}
      className="goal-card"
    >
      <span>{name}</span>
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
  );
};

export default connector(GoalCard);
