import ActionTypes from "./../Actions/ActionTypes"

const userRegistered = (state = {
    isRegistered: false
}, action) => {
    switch (action.type) {
        case ActionTypes.USER_REGISTERED:

            setTimeout(() => {
                state = {isRegistered: false}
            }, 5000)

            return state = { isRegistered: true }
        default:
            return state;
    }
};

export default userRegistered;