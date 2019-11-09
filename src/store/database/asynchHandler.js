import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
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

export const newItemHandler = (todoList, item) => (dispatch, getState, { getFirestore }) => {
  const itemCollection = todoList.items 
  itemCollection.push(item)
  const firestore = getFirestore();
  firestore.collection('todoLists').doc(todoList.id).update({items: itemCollection})
  .then(() => {
    dispatch(actionCreators.newItem(item))
  })
};

export const changeItemHandler = () => (dispatch, getState, { getFirestore }) => {
  
};

export const cancelItemHandler = (backup, todoList) => (dispatch, getState, { getFirestore }) => {
  const itemCollection = todoList.items 
  itemCollection.filter((item)=> {
    return item.key != backup.key
  })
  const firestore = getFirestore();
  firestore.collection('todoLists').doc(todoList.id).update({items: itemCollection})
  .then(() => {
    dispatch(actionCreators.cancelItem(backup))
  })
};