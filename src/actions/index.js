import axios from 'axios';

export const USER_START = 'USER_START';
export const SET_USER = 'SET_USER';

export const register = (userInfo, method) => dispatch => {
    dispatch({ type: USER_START });

    axios.post(`http://localhost:5000/api/auth/${method}`, userInfo)
        .then(res => {
            let user;
            method === 'login' ? user = res.data.user : user = res.data.newUser;
            sessionStorage.setItem('token', res.data.token)
            dispatch({ type: SET_USER, payload: user })
        })
        .catch(err => {
            console.log('ERROR FROM REGISTER', err);
        });
}; 