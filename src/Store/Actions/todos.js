import ActionTypes from './ActionTypes';

export function updateTodos(todos) {

    return {
        type: ActionTypes.UPDATE_TODOS,
        payload: todos
    }
}

export function addTodo(todo) {

    return {
        type: ActionTypes.ADD_TODO,
        todo
    }
}

export function clearTodos() {

    return {
        type: ActionTypes.CLEAR_ALL_TODOS
    }
}