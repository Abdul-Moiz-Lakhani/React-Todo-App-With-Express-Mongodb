import ActionTypes from "./../Actions/ActionTypes"

const showCongrats = (state = {
    status: false,
    congratsMessage: ""
}, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_CONGRTATS:
            return state = { status: true, congratsMessage: action.payload };
        case ActionTypes.HIDE_CONGRTATS:
            return state = { status: false, congratsMessage: "" }
        default:
            return state;
    }
};

export default showCongrats;