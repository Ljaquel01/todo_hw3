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

const getIndex = (list, key) => {
  for (let i = 0; i < list.length; i++) { 
    if (list[i].key === key) { return i }
  }
  return -1
};

export const submitItemHandler = (todoList, item, newItem) => (dispatch, getState, { getFirestore }) => {
  const items = todoList.items
  const index = getIndex(items, item.key)
  const { description, assigned_to, due_date, completed} = newItem
  items[index].description = description
  items[index].assigned_to = assigned_to
  items[index].due_date = due_date
  items[index].completed = completed
  const firestore = getFirestore();
  firestore.collection('todoLists').doc(todoList.id).update({items: items})
  .then(() => {
    dispatch(actionCreators.submitItem(newItem))
  })
};

const idGenerator = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const submitNewItemHandler = (todoList, newItem) => (dispatch, getState, { getFirestore }) => {
  const items = todoList.items
  const id = idGenerator()
  newItem.id = id
  newItem.key = id
  items.push(newItem)
  const firestore = getFirestore();
  firestore.collection('todoLists').doc(todoList.id).update({items: items})
  .then(() => {
    dispatch(actionCreators.submitNewItem(newItem))
  })
};