import * as actionCreators from '../actions/actionCreators.js'

export const ItemSortCriteria = {
  SORT_BY_TASK_DECREASING: "SORT_BY_TASK_DECREASING",
  SORT_BY_TASK_INCREASING: "SORT_BY_TASK_INCREASING",
  SORT_BY_DUE_DATE_DECREASING: "SORT_BY_DUE_DATE_DECREASING",
  SORT_BY_DUE_DATE_INCREASING: "SORT_BY_DUE_DATE_INCREASING",
  SORT_BY_STATUS_DECREASING: "SORT_BY_STATUS_DECREASING",
  SORT_BY_STATUS_INCREASING: "SORT_BY_STATUS_INCREASING"
}

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

export const getIndex = (list, key) => {
  for (let i = 0; i < list.length; i++) { 
    if (list[i].key.toString() === key.toString()) { return i }
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

export const idGenerator = () => {
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

export const deleteListHandler = (todoList) => (dispatch, getState, { getFirestore }) => {
  const { id } = todoList
  const firestore = getFirestore()
  firestore.collection('todoLists').doc(id).delete()
  .then(() => {
    dispatch(actionCreators.deleteList(todoList))
  })
}

export const comp = (order) => (item1, item2) => {
  let current = order;
  if (current === ItemSortCriteria.SORT_BY_TASK_DECREASING
      || current === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING
      || current === ItemSortCriteria.SORT_BY_STATUS_DECREASING) {
      let temp = item1;
      item1 = item2;
      item2 = temp;
  }
  if (current === ItemSortCriteria.SORT_BY_TASK_INCREASING
      || current === ItemSortCriteria.SORT_BY_TASK_DECREASING) {
      if (item1.description < item2.description)
          return -1;
      else if (item1.description > item2.description)
          return 1;
      else
          return 0;
  }
  else if (current === ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING
      || current === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING) {
      let dueDate1 = item1.due_date;
      let dueDate2 = item2.due_date;
      let date1 = new Date(dueDate1);
      let date2 = new Date(dueDate2);
      if (date1 < date2)
          return -1;
      else if (date1 > date2)
          return 1;
      else
          return 0;
  }
  else {
      if (item1.completed < item2.completed)
          return -1;
      else if (item1.completed > item2.completed)
          return 1;
      else
          return 0;
  }
}

export const sortingHandler = (todoList, newOrder) => (dispatch, getState, { getFirestore }) => {
  
  const { order, id, items } = todoList
  let itemss = items
  const firestore = getFirestore()
  if(order !== null && order !== undefined) {
    firestore.collection('todoLists').doc(id).update({ order: newOrder })
    .then(() => {
      itemss.sort(comp(newOrder))
      firestore.collection('todoLists').doc(id).update({items: itemss})
      .then(() => {
        dispatch(actionCreators.sortItems(todoList))
      })
    })
  }
  //else {
  //  firestore.collection('todoLists').doc(id).update({ 
  //    name: todoList.name,
  //    owner: todoList.owner,
  //    items: todoList.items,
  //    order: newOrder })
  //  .then(() => {
  //    dispatch(actionCreators.sortItems(todoList))
  //  })
  //}
}

export const deleteItemHandler = (todoList, item) => (dispatch, getState, { getFirestore }) => {
  const items = todoList.items
  const index = getIndex(items, item.key)
  items.splice(index, 1)
  const firestore = getFirestore();
  firestore.collection('todoLists').doc(todoList.id).update({items: items})
  .then(() => {
    dispatch(actionCreators.deleteItem(item))
  })
}

export const moveItemHandler = (todoList, item, name) => (dispatch, getState, { getFirestore }) => {
  const items = todoList.items
  const index = getIndex(items, item.key)
  let dest = index-1
  if(name === "up") { 
    [items[dest], items[index]] = [items[index], items[dest]]
  }
  else {
    dest = index+1;
    [items[dest], items[index]] = [items[index], items[dest]]
  }
  const firestore = getFirestore();
  firestore.collection('todoLists').doc(todoList.id).update({items: items})
  .then(() => {
    dispatch(actionCreators.moveItem(item))
    //firestore.collection('todoLists').doc(todoList.id).update({ order: todoList.order })
    //.then(() => {
    //  dispatch(actionCreators.moveItem(item))
    //})
  })
}

export const updateTimeHandler = (todoList) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  firestore.collection('todoLists').doc(todoList.id).update({lastModified: new Date()})
  .then(() => {
    dispatch(actionCreators.updateTime(todoList))
  })
}