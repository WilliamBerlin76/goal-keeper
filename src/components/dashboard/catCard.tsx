import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import { updateCat, deleteCat } from "../../actions/index";

import { connect, ConnectedProps } from "react-redux";

import "./dashboard.scss";

const mapState = (state: {
  user: {
    id: number;
  };
}) => {
  return {
    user: state.user,
  };
};

const mapDispatch = { updateCat, deleteCat };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
  name: string;
  catId: number;
};

interface nameTypes {
  name: string;
};

const CatCard: React.FC<Props> = ({
  catId,
  user,
  name,
  updateCat,
  deleteCat,
}) => {
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

  const handleSubmit = (e: any) => {
    updateCat(user.id, catId, newName);
    setCanEdit(!canEdit);
  };

  const handleDelete = (e: any) => {
    deleteCat(user.id, catId);
    setCanDelete(false);
  };

  const gotoGoals = (e: any) => {
    history.push(`/${catId}/goals`);
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
            <button onClick={handleSubmit}>Save</button>
          </div>
        ) : (
          <span onClick={gotoGoals}>{displayName}</span>
        )}
        {showPen && (
          <div className="cat-buttons">
            <CreateTwoToneIcon
              fontSize="default"
              opacity=".3"
              onMouseOver={bolden}
              onMouseLeave={grey}
              onClick={() => setCanEdit(!canEdit)}
            />
            <DeleteIcon
              fontSize="default"
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
          <p>Are you sure you want to delete this category?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setCanDelete(false)}>No</button>
        </div>
      )}
    </>
  );
};

export default connector(CatCard);
