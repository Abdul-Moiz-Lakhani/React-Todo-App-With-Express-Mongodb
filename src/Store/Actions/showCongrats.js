import ActionTypes from "./ActionTypes"

export function showCongrats(message) {
    return {
        type: ActionTypes.SHOW_CONGRTATS,
        payload: message
    }
}

export function hideCongrats() {
    return {
        type: ActionTypes.HIDE_CONGRTATS
    }
}