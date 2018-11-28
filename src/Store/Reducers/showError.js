import ActionTypes from "./../Actions/ActionTypes"

const showError = (state = {
    status: false,
    errorMessage: ""
}, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_ERROR:
            return state = { status: true, errorMessage: action.payload };
        case ActionTypes.HIDE_ERROR:
            return state = { status: false, errorMessage: "" }
        default:
            return state;
    }
};

export default showError;