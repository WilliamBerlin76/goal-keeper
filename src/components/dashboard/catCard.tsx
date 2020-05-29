import React, { useState } from 'react';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import axiosWithAuth from '../../utils/axiosWithAuth';

interface Props {
    name: string;
    user: {id: number};
    catId: number;
};

interface nameTypes {
    name: string;
}

const CatCard: React.FC<Props> = ({ catId, user, name }) => {
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [newName, setNewName] = useState<nameTypes>({name: ''});
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
        axiosWithAuth()
            .put(`/api/${user.id}/categories/${catId}/update`, newName)
            .then(res => {
                setDisplayName(res.data.name)
                setCanEdit(!canEdit)
            })
            .catch(err => {
                console.log(err);
                setCanEdit(!canEdit)
            });
    };

    return(
        <div>
            {canEdit ? 
                <>
                    <input 
                        placeholder={name}
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
            <CreateTwoToneIcon 
                fontSize='small' 
                opacity='.3'
                display='none'
                onMouseOver={bolden}
                onMouseLeave={grey}
                onClick={() => setCanEdit(!canEdit)}
            />
        </div>
    );
};

export default CatCard;