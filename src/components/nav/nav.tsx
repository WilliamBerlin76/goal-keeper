import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { connect, ConnectedProps } from "react-redux";

import { logOut } from "../../actions/index"

const mapState = (state: {
                    user: {
                        id: number;
                    }
                }) => {
                return {
                    user: state.user
                };
};

const mapDispatch = { logOut }

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const Nav: React.FC<Props> = ({ user, logOut }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>()

    useEffect(() => {
        user ? setLoggedIn(true) : setLoggedIn(false)
    }, [user]);

    return (
        <>  
            {loggedIn && (
                <>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                    <NavLink to='/' onClick={() => logOut()}>Log Out</NavLink>
                </>
            )}
            {!loggedIn && (
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/register'>Register</NavLink>
                </>
            )}
            
        </>
    );
};

export default connector(Nav);