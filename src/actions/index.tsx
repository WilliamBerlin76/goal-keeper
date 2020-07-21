import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

export const USER_START = 'USER_START';
export const SET_USER = 'SET_USER';
export const LOG_OUT = 'LOG_OUT';
export const AUTH_ERR = 'AUTH_ERR';

export const SET_CAT = 'SET_CAT';
export const EDIT_CAT = 'EDIT_CAT';
export const DELETE_CAT = 'DELETE_CAT';

export const ADD_GOAL = 'ADD_GOAL';
export const SET_GOALS = 'SET_GOALS';
export const DELETE_GOAL = 'DELETE_GOAL';
export const EDIT_GOAL = 'EDIT_GOAL';

export const GET_STEPS = 'GET_STEPS';
export const ADD_STEP = 'ADD_STEP';
export const DELETE_STEP = 'DELETE_STEP';
export const EDIT_STEP = 'EDIT_STEP';

export const authenticate = (userInfo: object, method: string, remember: boolean) => async (dispatch: any) => {
    dispatch({ type: USER_START });
    method = method.toLowerCase();
    await axios.post(`https://node-goals.herokuapp.com/api/auth/${method}`, userInfo)
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

export const logOut = () => (dispatch: any) => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch({ type: LOG_OUT, payload: null })
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
            localStorage.clear();
            sessionStorage.clear();
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
            dispatch({ type: DELETE_GOAL, payload: goalId});
        })
        .catch(err => {
            console.log(err)
        });
};

export const editGoal = (userId: number, goalId: number, change: {name: string}) => (dispatch: any) => {
    axiosWithAuth()
        .put(`/api/${userId}/goals/${goalId}/update`, change)
        .then(res => {
            dispatch({ type: EDIT_GOAL, payload: {id: goalId, change: change.name}})
        })
        .catch(err => {
            console.log(err)
        });
};

export const getSteps = (userId: number, goalId: string) => (dispatch: any) => {
    axiosWithAuth()
        .get(`/api/${userId}/steps/${goalId}`)
        .then(res => {
            dispatch({ type: GET_STEPS, payload: res.data });
        })
        .catch(err => {
            console.log(err)
        });
};

export const addStep = (userId: number, goalId: string, step: {name: string, stepNum: number}) => (dispatch: any) => {
    axiosWithAuth()
        .post(`/api/${userId}/steps/${goalId}`, step)
        .then(res => {
            dispatch({ type: ADD_STEP, payload: res.data });
        })
        .catch(err => {
            console.log(err);
        });
};

export const removeStep = (userId: number, stepId: number) => (dispatch: any) => {
    axiosWithAuth()
        .delete(`/api/${userId}/steps/${stepId}/remove`)
        .then(res => {
            dispatch({ type: DELETE_STEP, payload: stepId})
        })
        .catch(err => {
            console.log(err)
        });
};

export const editStep = (userId: number, stepId: number, changes: object) => (dispatch: any) => {
    axiosWithAuth()
        .put(`/api/${userId}/steps/${stepId}/update`, changes)
        .then(res => {
            dispatch({ type: EDIT_STEP, payload: {stepId, changes}})
        })
        .catch(err => {
            console.log(err);
        });
};