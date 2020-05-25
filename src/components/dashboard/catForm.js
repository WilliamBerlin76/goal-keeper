import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addCat } from '../../actions/index';

const CatForm = props => {
    
    const [category, setCategory] = useState({});

    const handleSubmit = e => {
        props.addCat(props.user.id, category)
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

const mapStateToProps = state => {
    return{
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    { addCat }
)(CatForm);