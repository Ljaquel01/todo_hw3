// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CREATE_TODO_LIST = 'CREATE_TODO_LIST';
export const CREATE_TODO_LIST_ERROR = 'CREATE_TODO_LIST_ERROR';
export const NAME_CHANGE = 'NAME_CHANGE';
export const OWNER_CHANGE = 'OWNER_CHANGE';
export const NEW_ITEM = 'NEW_ITEM';
export const CANCEL_ITEM = 'CANCEL_ITEM';
export const CHANGE_ITEM = 'CHANGE_ITEM';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: REGISTER_SUCCESS }
};
export function registerError(error) { 
    return { type: REGISTER_ERROR, error }
};
export function loginSuccess() {
    return { type: LOGIN_SUCCESS }
};
export function loginError(error) {
    return { type: LOGIN_ERROR, error }
};
export function logoutSuccess() {
    return { type: LOGOUT_SUCCESS }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
export function createTodoList(todoList) {
    return { type: CREATE_TODO_LIST, todoList }
}
export function createTodoListError(error) {
    return { type: CREATE_TODO_LIST_ERROR, error }
}
export function nameChange(value) {
    return { type: NAME_CHANGE, value }
}
export function ownerChange(value) {
    return { type: OWNER_CHANGE, value }
}
export function newItem(item) {
    return { type: NEW_ITEM, item}
}
export function cancelItem(item) {
    return { type: CANCEL_ITEM, item}
}
export function changeItem() {
    return { type: CHANGE_ITEM}
}