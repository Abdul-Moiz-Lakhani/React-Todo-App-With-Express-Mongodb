import { firebaseApp } from './../../firebase';

import { showLoader, hideLoader } from "./showLoader"
import { showCongrats, hideCongrats } from "./showCongrats"
import { showError, hideError } from "./showError";

export function addTodo(todo) {
    return dispatch => {

        dispatch(showLoader());

        let currentUser = firebaseApp.auth().currentUser;
        
        let thisTodo = {
            todoWork: todo,
            completed: false,
            editStatus: false
        }

        firebaseApp.database().ref(`/Users/${currentUser.uid}/todos`).push(thisTodo).then(() => {
            
            dispatch(hideLoader())
            dispatch(showCongrats("Congrats! Todo Successfuly Added"))

            setTimeout(() => {
                dispatch(hideCongrats());
            }, 3000)

        }).catch(error => {

            dispatch(showError("An error occured please try again"))

            dispatch(hideLoader())
            
            setTimeout(() => {
                dispatch(hideError());
            }, 3000)
        })
    }
}