import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/' onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
            }}>Log Out</NavLink>
        </>
    );
};

export default Nav;