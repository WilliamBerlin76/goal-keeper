import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { addCat } from '../../actions/index';

import Loader from '../loader/loader';

const mapState = (state: {
                    isFetching: boolean;
                    user: {
                        id: number;
                        username: string
                    }
                }) => {
    return {
        isFetching: state.isFetching,
        user: state.user
    };
};

const mapDispatch = { addCat };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const CatForm: React.FC<Props> = ({user, addCat, isFetching}) => {
    
    const [category, setCategory] = useState<object>({});

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
            {isFetching === true ? 
                <Loader />
                :
                <button onClick={handleSubmit}>add category</button>
            }
            
        </form>
    );
};

export default connector(CatForm);