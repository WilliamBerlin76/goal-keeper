import {
    USER_START,
    SET_USER,
} from '../actions'

const initialState = {
    user: {
        id: sessionStorage.getItem('persist-user') ? JSON.parse(sessionStorage.getItem('persist-user')).id : null,
        userName: sessionStorage.getItem('persist-user') ? JSON.parse(sessionStorage.getItem('persist-user')).userName : null,
        email: sessionStorage.getItem('persist-user') ? JSON.parse(sessionStorage.getItem('persist-user')).email : null
    }
}
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
                    userName: action.payload.username,
                    email: action.payload.email
                }
            };
        default: return state
    };
};

export default reducer;