import axios from 'axios';

export const USER_START = 'USER_START';
export const SET_USER = 'SET_USER';

export const authenticate = (userInfo, method, remember) => async dispatch => {
    dispatch({ type: USER_START });

    await axios.post(`http://localhost:5000/api/auth/${method}`, userInfo)
        .then(res => {
            let user;
            method === 'login' ? user = res.data.user : user = res.data.newUser;
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('persist-user', JSON.stringify({
                id: user.id, 
                username: user.username, 
                email: user.email
            }));
            if (remember){
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('persist-user', JSON.stringify({
                    id: user.id, 
                    username: user.username, 
                    email: user.email
                })); 
            }
            dispatch({ type: SET_USER, payload: user });
        })
        .catch(err => {
            console.log('ERROR FROM auth', err);
        });
}; 