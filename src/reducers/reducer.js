import {
    FETCH_START,
    SET_USER,
    SET_CAT,
    EDIT_CAT,
    DELETE_CAT,
    AUTH_ERR,
    ADD_GOAL,
    SET_GOALS,
    DELETE_GOAL,
    EDIT_GOAL,
    GET_STEPS,
    ADD_STEP,
    DELETE_STEP,
    EDIT_STEP,
    LOG_OUT
} from '../actions';

let localUser = localStorage.getItem('persist-user');
let sessionUser = sessionStorage.getItem('persist-user');

const initialState = {
    user: localUser ? JSON.parse(localUser) : 
            sessionUser ? JSON.parse(sessionUser) : null,
    categories: [],
    goals: {},
    stepList: {},
    isFetching: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_START:
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
        case LOG_OUT:
            return {
                ...state,
                error: '',
                user: null
            }
        case AUTH_ERR:
            return{
                ...state,
                isFetching: false,
                error: action.payload
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
            };
        case ADD_GOAL:
            return {
                ...state,
                isFetching:false,
                error: '',
                goals: action.payload
            };
        case SET_GOALS:
            return {
                ...state,
                isFetching: false,
                error: '',
                goals: action.payload
            };
        case DELETE_GOAL:
            return {
                ...state,
                isFetching: false,
                error: '',
                goals: {
                    ...state.goals,
                    goals: state.goals.goals.filter(goal => goal.id !== action.payload)
                }
            };
        case EDIT_GOAL:
            return {
                ...state,
                isFetching: false,
                error: '',
                goals: {
                    ...state.goals,
                    goals: state.goals.goals.map(goal => {
                        if (goal.id === action.payload.id){
                            goal.name = action.payload.change;
                        }
                        return goal;
                    })
                }
            };
        case GET_STEPS:
            return {
                ...state,
                isFetching: false,
                error: '',
                stepList: action.payload
            };
        case ADD_STEP:
            return {
                ...state,
                isFetching: false,
                error: '',
                stepList: {
                    ...state.stepList,
                    steps: action.payload.steps
                }
            };
        case DELETE_STEP:
            return {
                ...state,
                isFetching: false,
                error: '',
                stepList: {
                    ...state.stepList,
                    steps: state.stepList.steps.filter(step => step.step_id !== action.payload)
                }
            };
        case EDIT_STEP:
            const compareSteps = (a, b) => {
                const stepA = a.step_num;
                const stepB = b.step_num;

                let comparison = 0;
                if (stepA > stepB){
                    comparison = 1
                } else if (stepA < stepB){
                    comparison = -1
                };
                return comparison;
            };
            
            return {
                ...state,
                isFetching: false,
                error: '',
                stepList: {
                    ...state.stepList,
                    steps: state.stepList.steps.map(step => {
                        if (step.step_id === action.payload.stepId){
                            step = {
                                ...step,
                                name: action.payload.changes.name,
                                step_num: action.payload.changes.stepNum
                            }
                        }
                        return step;
                    }).sort(compareSteps)
                }
            }
        default: return state;
    };
};

export default reducer;