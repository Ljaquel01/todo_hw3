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
export const SUBMIT_NEW_ITEM = 'SUBMIT_NEW_ITEM';
export const CANCEL_ITEM = 'CANCEL_ITEM';
export const SUBMIT_ITEM = 'SUBMIT_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const SORT_ITEMS = 'SORT_ITEMS';
export const UPDATE_TIME = 'UPDATE_TIME';

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
export function submitItem(item) {
    return { type: SUBMIT_ITEM, item}
}
export function submitNewItem(item) {
    return { type: SUBMIT_NEW_ITEM, item}
}
export function deleteList(todoList) {
    return { type: DELETE_LIST, todoList}
}
export function sortItems(todoList) {
    return { type: SORT_ITEMS, todoList}
}
export function updateTime(todoList) {
    return { type: UPDATE_TIME, todoList}
}