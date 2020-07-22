import React, { useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import CatForm from './catForm';
import CatCard from './catCard';
import { getCats } from '../../actions/index';

import "./dashboard.scss";

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
        <section className='main-comp-section'>
            <h2>Your Categories</h2>
            <p>
                This is where you can categorize your goals. 
                Here you can add a category name, and click on it to 
                view it's goal page.
            </p>
            <CatForm />
            {categories.length === 0 ?
                <p>You don't have any categories yet!</p>
                :
                <>
                    <p>(Click a category to view your goals)</p>
                    {categories.map(cat => {
                        return(
                        <CatCard 
                            key={cat.id}
                            catId={cat.id}
                            name={cat.name}
                        />
                        );
                    })}
                </>
            
            }
            
        </section>
    );
};

export default connector(Dashboard);