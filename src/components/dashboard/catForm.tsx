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

    const handleSubmit = (e: any)=> {
        e.preventDefault();
        addCat(user.id, category);
    };

    return (
        <form className='add-forms'>  
            <p>Type and enter below to add a category</p>
            <input 
                placeholder='category name'
                name='name'
                onChange={e => setCategory({name: e.target.value})}
            />
            {isPosting === true ? 
                <Loader />
                :
                <button 
                    onClick={handleSubmit} 
                    disabled={category.name.length === 0}
                >add category</button>
            }
            
        </form>
    );
};

export default connector(CatForm);