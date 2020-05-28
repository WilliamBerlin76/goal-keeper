import React, { useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import CatForm from './catForm';
import { getCats } from '../../actions/index';

const mapState = (state: {
                    user: {
                        id: number;
                        username: string
                    }; 
                    categories: Array<any>
                }) => {
    return{
        user: state.user,
        categories: state.categories
    };
};

const mapDispatch = { getCats };

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const Dashboard: React.FC<Props> = ({user, categories, getCats}) => {
    
    useEffect(() => {
        getCats(user.id)
    }, [getCats, user.id]);

    return (
        <>
            <h2>Hello {user.username}</h2>
            <CatForm />
            <h3>categories</h3>
            {categories.map(cat => {
                return(
                <p key={cat.id}>{cat.name}</p>
                );
            })}
        </>
    );
};

export default connector(Dashboard);