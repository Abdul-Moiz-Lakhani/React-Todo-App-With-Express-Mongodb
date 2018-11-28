import { createStore, combineReducers, applyMiddleware } from "redux";
import userAuthenticated from "./Reducers/authReducer"
import showLoader from "./Reducers/showLoader"
import showError from "./Reducers/showError"
import showCongrats from "./Reducers/showCongrats"
import userRegistered from "./Reducers/userRegistered"
import userTodos from "./Reducers/todos"
import thunk from "redux-thunk";

const AllReducers = {
    showLoader,
    showError,
    showCongrats,
    userAuthenticated,
    userRegistered,
    userTodos
};

export default createStore(combineReducers(AllReducers), {}, applyMiddleware(thunk))