import { firebaseApp } from './../../firebase';

import ActionTypes from "./../Actions/ActionTypes"

import { showLoader, hideLoader } from "./showLoader"
import { showCongrats, hideCongrats } from "./showCongrats"
import { showError, hideError } from "./showError";
import { updateTodos } from "./todos";

export function userRegistered() {
    return {
        type: ActionTypes.USER_REGISTERED
    }
}

export function userSignedIn(user, todos) {
    return {
        type: ActionTypes.USER_SIGN_IN,
        payload: user,
        todos
    }
}

export function userSignedOut() {
    return {
        type: ActionTypes.USER_SIGN_OUT
    }
}

export function RegisterUser(name, email, pass) {
    return dispatch => {

        dispatch(showLoader());

        firebaseApp.auth().createUserWithEmailAndPassword(email, pass).then(user => {

            let currentUserDetails = {
                userUid: user.uid,
                userName: name
            }

            firebaseApp.database().ref(`/Users/${user.uid}`).set(currentUserDetails).then(() => {

                dispatch(hideLoader())
                dispatch(showCongrats("Congrats! Sign Up Successful"))
                dispatch(userSignedOut())
                firebaseApp.auth().signOut();

                setTimeout(() => {
                    dispatch(hideCongrats());
                }, 3000)
            })

        }).catch(error => {
            let errorMessage = error.message;

            let firebaseErrors = {
                error1: "The email address is already in use by another account.",
                error2: "The email address is badly formatted."
            };

            if (errorMessage === firebaseErrors.error1) {
                dispatch(showError("Already an account with this Email"))
            }
            else if (errorMessage === firebaseErrors.error2) {
                dispatch(showError("Invalid Email"))
            }
            else {
                dispatch(showError(errorMessage))
            }

            dispatch(hideLoader())
            setTimeout(() => {
                dispatch(hideError());
            }, 3000)
        })
    }
}

export function SignInUser(email, pass) {
    return dispatch => {

        dispatch(showLoader());

        firebaseApp.auth().signInWithEmailAndPassword(email, pass).then(user => {

            firebaseApp.database().ref(`/Users/${user.uid}`).on("value", userData => {

                let currentUser = userData.val();
                dispatch(userSignedIn(currentUser))

                firebaseApp.database().ref(`/Users/${user.uid}/todos`).once("value", data => {

                    let todos = data.val() === null ? [] : data.val();

                    dispatch(updateTodos(todos))

                    dispatch(hideLoader())
                    dispatch(showCongrats("Congrats! Sign In Successful"))

                    setTimeout(() => {
                        dispatch(hideCongrats());
                    }, 3000)
                })
            })

        }).catch(error => {
            let errorMessage = error.message;

            let firebaseErrors = {
                error1: "The password is invalid or the user does not have a password.",
                error2: "The email address is badly formatted.",
                error3: "Password should be at least 6 characters",
                error4: "There is no user record corresponding to this identifier. The user may have been deleted."
            };

            if (errorMessage === firebaseErrors.error1) {
                dispatch(showError("Invalid Password"))
            }
            else if (errorMessage === firebaseErrors.error2) {
                dispatch(showError("Invalid Email"))
            }
            else if (errorMessage === firebaseErrors.error3) {
                dispatch(showError("Short Password"))
            }
            else if (errorMessage === firebaseErrors.error4) {
                dispatch(showError("User does not exist"))
            }
            else {
                dispatch(showError(errorMessage))
            }

            dispatch(hideLoader())
            setTimeout(() => {
                dispatch(hideError());
            }, 3000)
        })
    }
}
