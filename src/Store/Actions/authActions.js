import ActionTypes from "./../Actions/ActionTypes"

import { showLoader, hideLoader } from "./showLoader"
import { showCongrats, hideCongrats } from "./showCongrats"
import { showError, hideError } from "./showError";

export function userRegistered() {
    return {
        type: ActionTypes.USER_REGISTERED
    }
}

export function userSignedIn(data) {
    return {
        type: ActionTypes.USER_SIGN_IN,
        payload: data
    }
}

export function userSignedOut() {
    return {
        type: ActionTypes.USER_SIGN_OUT
    }
}

export function RegisterUser(name, email, pass) {
    return dispatch => {

        const testEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);

        if(testEmail) {
            
            dispatch(showLoader());

            let userCredentials = {
                name: name,
                email: email,
                password: pass
            }
            
            fetch('/user/signup', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(userCredentials)
            })
            .then((response) => response.json())
            .then((result) => {
                if(result.status) {
                    console.log(result.data);
                    dispatch(showCongrats(result.message));
                    setTimeout(() => {
                        dispatch(hideCongrats());
                    }, 3000)
                } else {
                    dispatch(showError(result.message));
                    setTimeout(() => {
                        dispatch(hideError());
                    }, 3000)
                }
                dispatch(hideLoader());
            })
        }
        else {
            dispatch(showError('Please Enter Correct Email!'));
            setTimeout(() => {
                dispatch(hideError());
            }, 3000)
        }
    }
}

export function SignInUser(email, pass) {
    return dispatch => {

        const testEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);

        if(testEmail) {
            
            dispatch(showLoader());

            let userCredentials = {
                email: email,
                password: pass
            }
            
            fetch('/user/signin', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(userCredentials)
            })
            .then((response) => response.json())
            .then((result) => {
                localStorage.setItem("auth_token", result.token);
                if(result.status) {
                    console.log(result.userData);
                    dispatch(userSignedIn(result.userData));
                    dispatch(showCongrats(result.message));
                    setTimeout(() => {
                        dispatch(hideCongrats());
                    }, 3000)
                } else {
                    dispatch(showError(result.message));
                    setTimeout(() => {
                        dispatch(hideError());
                    }, 3000)
                }
                dispatch(hideLoader());
            })
        }
        else {
            dispatch(showError('Please Enter Correct Email!'));
            setTimeout(() => {
                dispatch(hideError());
            }, 3000)
        }
    }
}
