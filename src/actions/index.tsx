import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

export const USER_START = 'USER_START';
export const SET_USER = 'SET_USER';
export const AUTH_ERR = 'AUTH_ERR';

export const SET_CAT = 'SET_CAT';
export const EDIT_CAT = 'EDIT_CAT';
export const DELETE_CAT = 'DELETE_CAT';

export const ADD_GOAL = 'ADD_GOAL';
export const SET_GOALS = 'SET_GOALS';
export const DELETE_GOAL = 'DELETE_GOAL';
export const authenticate = (userInfo: object, method: string, remember: boolean) => async (dispatch: any) => {
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
            dispatch({ type: AUTH_ERR, payload: err.response.data.message})
        });
}; 

export const addCat = (userId: number, category: object) => (dispatch: any) => {
    axiosWithAuth()
        .post(`/api/${userId}/categories/${userId}/add`, category)
        .then(res => {
            dispatch({ type: SET_CAT, payload: res.data.categories })
        })
        .catch(err => {
            console.log('ADDCAT', err)
        });
};

export const updateCat = (userId: number, catId: number, change: object) => (dispatch: any) => {
    axiosWithAuth()
        .put(`/api/${userId}/categories/${catId}/update`, change)
        .then(res => {
            dispatch({ type: EDIT_CAT, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        });
};

export const deleteCat = (userId: number, catId: number) => (dispatch: any) => {
    axiosWithAuth()
        .delete(`/api/${userId}/categories/${catId}/remove`)
        .then(res => {
            dispatch({ type: DELETE_CAT, payload: catId})
        })
        .catch(err => {
            console.log(err)
        });
};

export const getCats = (userId: number) => (dispatch: any) => {
    axiosWithAuth()
        .get(`/api/${userId}/categories/${userId}`)
        .then(res => {
            dispatch({ type: SET_CAT, payload: res.data.categories})
        })
        .catch(err => {
            alert(err.response.data.message)
        })
};

export const addGoal = (userId: number, catId: string, goal: object) => (dispatch: any) => {
    axiosWithAuth()
        .post(`/api/${userId}/goals/${catId}/add`, goal)
        .then(res => {
            dispatch({ type: ADD_GOAL, payload: res.data})
        })
        .catch(err => {
            console.log(err);
        });
};

export const getGoals = (userId: number, catId: string) => (dispatch: any) => {
    axiosWithAuth() 
        .get(`/api/${userId}/goals/${catId}`)
        .then(res => {
            dispatch({ type: SET_GOALS, payload: res.data})
        })
        .catch(err => {
            console.log(err)
        })
};

export const deleteGoal = (userId: number, goalId: number) => (dispatch: any) => {
    axiosWithAuth()
        .delete(`/api/${userId}/goals/${goalId}/remove`)
        .then(res => {
            dispatch({ type: DELETE_GOAL, payload: goalId})
        })
        .catch(err => {
            console.log(err)
        })
}

