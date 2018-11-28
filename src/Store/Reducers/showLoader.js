import ActionTypes from "./../Actions/ActionTypes"

const showLoader = (state = {
    status: false
}, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_LOADER:
            return state = { status: true };
        case ActionTypes.HIDE_LOADER:
            return state = { status: false };
        default:
            return state;
    }
};

export default showLoader;