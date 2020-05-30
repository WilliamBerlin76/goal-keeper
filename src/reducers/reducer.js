import {
    USER_START,
    SET_USER,
    SET_CAT,
    EDIT_CAT,
    DELETE_CAT
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
        case EDIT_CAT:
            let checkId = parseInt(action.payload.id)
            return{
                ...state,
                isFetching: false,
                error: '',
                categories: state.categories.map(cat => {
                    if (checkId === cat.id){
                        cat.name = action.payload.name;
                    };
                    return cat;
                })
            };
        case DELETE_CAT:
            return {
                ...state,
                isFetching: false,
                error: '',
                categories: state.categories.filter(cat => cat.id !== action.payload)
            }
        default: return state
    };
};

export default reducer;