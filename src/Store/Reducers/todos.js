import ActionTypes from "./../Actions/ActionTypes"

const userTodos = (state = {
    todos: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return state = { todos: action.todo }
        case ActionTypes.REMOVE_TODO:
            return state = { todos: action.todo }
        case ActionTypes.EDIT_TODO:
            return state = { todos: action.todo }
        case ActionTypes.CLEAR_ALL_TODOS:
            return state = { todos: [] }
        case ActionTypes.UPDATE_TODOS:
            return state = { todos: action.payload }
        default:
            return state;
    }
};

export default userTodos;