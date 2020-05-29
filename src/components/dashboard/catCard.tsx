import React, { useState } from 'react';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import { updateCat } from '../../actions/index';

import { connect, ConnectedProps } from 'react-redux';

const mapState = (state: {
                    user: {
                        id: number;
                    }; 
                }) => {
            return ({
                user: state.user,
            });
};

const mapDispatch = { updateCat };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
    name: string;
    catId: number;
};

interface nameTypes {
    name: string;
};

const CatCard: React.FC<Props> = ({ catId, user, name, updateCat }) => {
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [showPen, setShowPen] = useState<boolean>(false)
    const [newName, setNewName] = useState<nameTypes>({name: name});
    const [displayName, setDisplayName] = useState<string>(name)

    const bolden = (e: any) => {
        e.target.style.opacity = 1;
        e.target.style.cursor = 'pointer';
    };
    const grey = (e: any) => {
        e.target.style.opacity = .3
    };

    const handleChange = (e: any) => {
        setNewName({
            name: e.target.value
        });
    };

    const handleSubmit = (e: any) => {
        updateCat(user.id, catId, newName);
        setCanEdit(!canEdit);
        setDisplayName(newName.name)
    };

    return(
        <div
            onMouseOver={() => setShowPen(true)}
            onMouseLeave={() => setShowPen(false)}
        >
            {canEdit ? 
                <>
                    <input 
                        value={newName.name}
                        name='name'
                        onChange={handleChange}
                    />
                    <button 
                        onClick={handleSubmit}
                    >Save</button>
                </>
                :
                <span>{displayName}</span>
            }
            {showPen && (
                  <CreateTwoToneIcon 
                  fontSize='small' 
                  opacity='.3'
                  display='none'
                  onMouseOver={bolden}
                  onMouseLeave={grey}
                  onClick={() => setCanEdit(!canEdit)}
              />
            )}
        </div>
    );
};

export default connector(CatCard);