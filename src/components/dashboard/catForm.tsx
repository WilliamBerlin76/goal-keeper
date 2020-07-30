import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { addCat } from '../../actions/index';

import Loader from '../loader/loader';

const mapState = (state: {
                    isPosting: boolean;
                    user: {
                        id: number;
                        username: string
                    }
                }) => {
    return {
        isPosting: state.isPosting,
        user: state.user
    };
};

const mapDispatch = { addCat };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

type catTypes = {
    name: string;
}

const CatForm: React.FC<Props> = ({user, addCat, isPosting}) => {
    
    const [category, setCategory] = useState<catTypes>({name: ''});
    const [err, setErr] = useState<boolean>(false);

    const handleSubmit = (e: any)=> {
        e.preventDefault();
        if(!category.name) {
            setErr(true);
        } else {
            setErr(false);
            addCat(user.id, category);
        }
    };

    return (
        <form className='add-forms'>  
            <p>Type and enter below to add a category</p>
            <input 
                placeholder='category name'
                name='name'
                onChange={e => setCategory({name: e.target.value})}
            />
            {err && <span className='auth-err'>must submit a category name</span>}
            {isPosting === true ? 
                <Loader />
                :
                <button onClick={handleSubmit}>add category</button>
            }
            
        </form>
    );
};

export default connector(CatForm);