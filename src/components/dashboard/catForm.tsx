import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { addCat } from '../../actions/index';

const mapState = (state: {
                    user: {
                        id: number;
                        username: string
                    }
                }) => {
    return {
        user: state.user
    };
};

const mapDispatch = { addCat };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const CatForm: React.FC<Props> = ({user, addCat}) => {
    
    const [category, setCategory] = useState<object>({});

    const handleSubmit = (e: any)=> {
        addCat(user.id, category)
    };

    return (
        <>
            <input 
                placeholder='category name'
                name='name'
                onChange={e => setCategory({name: e.target.value})}
            />
            <button onClick={handleSubmit}>add category</button>
        </>
    );
};

export default connector(CatForm);