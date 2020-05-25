import {
    USER_START,
    SET_USER,
    SET_CAT,
} from '../actions'

let localUser = localStorage.getItem('persist-user');
let sessionUser = sessionStorage.getItem('persist-user');

const initialState = {
    user: {
        id: localUser ? JSON.parse(localUser).id : 
            sessionUser ? JSON.parse(sessionUser).id : null,
        username: localUser ? JSON.parse(localUser).username : 
            sessionUser ? JSON.parse(sessionUser).username : null,
        email: localUser ? JSON.parse(localUser).email : 
            sessionUser ? JSON.parse(sessionUser).email : null
    },
    categories: []
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_START:
            return {
                ...state,
                isFetching: true,
                error: ''
            };
        case SET_USER:
            return {
                ...state,
                isFetching: false,
                error: '',
                user: {
                    id: action.payload.id,
                    username: action.payload.username,
                    email: action.payload.email
                }
            };
        case SET_CAT:
            return {
                ...state,
                isFetching: false,
                error: '',
                categories: action.payload
            };
        default: return state
    };
};

export default reducer;