import ActionTypes from "./ActionTypes"

export function showError(error) {
    return {
        type: ActionTypes.SHOW_ERROR,
        payload: error
    }
}

export function hideError() {
    return {
        type: ActionTypes.HIDE_ERROR
    }
}