import ActionTypes from "./ActionTypes"

export function showLoader() {
    return {
        type: ActionTypes.SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: ActionTypes.HIDE_LOADER
    }
}