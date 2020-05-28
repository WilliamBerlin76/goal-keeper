import React, { useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import CatForm from './catForm';
import CatCard from './catCard';
import { getCats } from '../../actions/index';

const mapState = (state: {
                    user: {
                        id: number;
                        username: string
                    }; 
                    categories: Array<{
                        id: number;
                        name: string;
                    }>
                }) => {
        return ({
            user: state.user,
            categories: state.categories
        });
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
                <CatCard 
                    key={cat.id}
                    name={cat.name}
                />
                );
            })}
        </>
    );
};

export default connector(Dashboard);