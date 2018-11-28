import ActionTypes from "./../Actions/ActionTypes"

const userAuthenticated = (state = {
    isAuthenticated: false,
    user: {}
}, action) => {
    switch (action.type) {
        case ActionTypes.USER_SIGN_IN:
            return state = { isAuthenticated: true, user: action.payload};
        case ActionTypes.USER_SIGN_OUT:
            return state = { isAuthenticated: false, user: { todos: {} }};
        default:
            return state;
    }
};

export default userAuthenticated;