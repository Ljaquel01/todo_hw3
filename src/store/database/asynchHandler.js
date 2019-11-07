import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const createTodoListHandler = (todoList) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').add({
      ...todoList
    }).then((todoList) => {
      dispatch(actionCreators.createTodoList(todoList));
    }).catch((err) => {
      console.log(err)
      dispatch(actionCreators.createTodoListError(err));
    })
};

export const fieldChangeHandler = (value, bool, todoList) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  if(bool) {
  firestore.collection('todoLists').doc(todoList.id).update({ name: value })
  .then((value) => {
    dispatch(actionCreators.nameChange(value))
  })
  }
  else {
    firestore.collection('todoLists').doc(todoList.id).update({ owner: value })
    .then((value) => {
      dispatch(actionCreators.ownerChange(value))
    })
  }
};