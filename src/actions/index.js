import axios from 'axios';

export const USER_START = 'USER_START';
export const SET_USER = 'SET_USER';

export const register = userInfo => dispatch => {
    dispatch({ type: USER_START });

    axios.post('http://localhost:5000/api/auth/register', userInfo)
        .then(res => {
            let userInfo = res.data.newUser;
            console.log(res);
            localStorage.setItem('token', res.data.token)
            dispatch({ type: SET_USER, payload: userInfo })
        })
        .catch(err => {
            console.log('ERROR FROM REGISTER', err)
        });
}; 