import React, { useState } from 'react';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';

interface Props {
    name: string;
};

const CatCard: React.FC<Props> = ({ name }) => {
    const [canEdit, setCanEdit] = useState<boolean>(false);

    const bolden = (e: any) => {
        e.target.style.opacity = 1;
        e.target.style.cursor = 'pointer';
    };
    const grey = (e: any) => {
        e.target.style.opacity = .3
    };

    return(
        <div>
            {canEdit ? 
                <>
                    <input 
                        value={name}
                    />
                    <button>Save</button>
                </>
                :
                <span>{name}</span>
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
       
    )
};

export default CatCard;