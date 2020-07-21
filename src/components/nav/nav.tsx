import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

import { connect, ConnectedProps } from "react-redux";

import { logOut } from "../../actions/index";
import './nav.scss';

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

const mapDispatch = { logOut }

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const Nav: React.FC<Props> = ({ user, logOut }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        user ? setLoggedIn(true) : setLoggedIn(false);
    }, [user]);

    const handleClick = (e: any) => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
        <div className='nav'>  
            <h1 id='title'>Goal-Keeper</h1>
            <div className='right-side'>
                <span id='username'>{user.username}</span>
                {menuOpen ?
                    <ClearRoundedIcon 
                        fontSize="large"
                        onClick={handleClick}
                        style={{ marginRight: '13px', cursor: 'pointer' }}
                    />
                    :
                    <MenuRoundedIcon
                        fontSize="large"
                        onClick={handleClick}
                        style={{ marginRight: '13px', cursor: 'pointer' }}
                    />
                }
            </div>
            
        </div>
        {menuOpen && (
            <>
                {loggedIn && (
                    <div className='nav-items'>
                        <NavLink className='nav-item' to='/dashboard'>Dashboard</NavLink>
                        <NavLink className='nav-item' to='/' onClick={() => logOut()}>Log Out</NavLink>
                    </div>
                )}
                {!loggedIn && (
                    <div className='nav-items'>
                        <NavLink className='nav-item' to='/login'>Login</NavLink>
                        <NavLink className='nav-item' to='/register'>Register</NavLink>
                    </div>
                )}
            </>
        )}
        </>
    );
};

export default connector(Nav);