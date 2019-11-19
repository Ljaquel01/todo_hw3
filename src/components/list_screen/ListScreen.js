import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js';
import { firestoreConnect } from 'react-redux-firebase';
import { fieldChangeHandler, deleteListHandler, sortingHandler, updateTimeHandler} from '../../store/database/asynchHandler'

const ItemSortCriteria = {
    SORT_BY_TASK_DECREASING: "SORT_BY_TASK_DECREASING",
    SORT_BY_TASK_INCREASING: "SORT_BY_TASK_INCREASING",
    SORT_BY_DUE_DATE_DECREASING: "SORT_BY_DUE_DATE_DECREASING",
    SORT_BY_DUE_DATE_INCREASING: "SORT_BY_DUE_DATE_INCREASING",
    SORT_BY_STATUS_DECREASING: "SORT_BY_STATUS_DECREASING",
    SORT_BY_STATUS_INCREASING: "SORT_BY_STATUS_INCREASING"
}

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }
    
    componentDidMount() {
        if(this.props.todoList) { this.props.updateTime(this.props.todoList) }
        var elems1 = document.querySelectorAll(".modal");
        window.M.Modal.init(elems1);
    }

    handleChange = (e) => {
        const { target } = e;
        let value = target.value;
        this.props.fieldChange(value, true ? target.name === "name" : false, this.props.todoList)
        this.setState(state => ({
        ...state,
        [target.id]: value,
        }));
    }

    handleOnBlur = (e) => {
        if(e.target.value === '') {
            e.target.value = "unknown"
        }
        this.handleChange(e)
    }

    handleDelete = (e) => {
        e.stopPropagation()
        this.props.deleteHandler(this.props.todoList)
        this.props.history.push('/')
    }

    addItem = (e) => {
        this.props.history.push('/todoList/' + this.props.todoList.id +'/todoItem')
    }

    sortItemsByTask = (e) => {
      if (this.props.todoList.order === (ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
          this.props.handleSort(this.props.todoList, ItemSortCriteria.SORT_BY_TASK_DECREASING)
      }
      else { this.props.handleSort(this.props.todoList, ItemSortCriteria.SORT_BY_TASK_INCREASING) }
    }
  
    sortItemsByDueDate = (e) => {
        if (this.props.todoList.order === (ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            this.props.handleSort(this.props.todoList, ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        else {
            this.props.handleSort(this.props.todoList, ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }
  
    sortItemsByStatus = (e) => {
        if (this.props.todoList.order === (ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            this.props.handleSort(this.props.todoList, ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        else {
            this.props.handleSort(this.props.todoList, ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid || !todoList) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container green lighten-5 items_list">
                <div className="row list-screen-header">
                    <h5 className="grey-text text-darken-3 col s4">@TodoList</h5>
                    <div data-target="modal1" 
                        className="trash modal-trigger col offset-s7 hoverable">
                        <i className="material-icons small">delete</i>
                    </div>
                </div>
                <div className="row list-screen-fields">
                    <div className="input-field col s6">
                        <label className="active" htmlFor="email">Name</label>
                        <input className="active" type="text" name="name" id="name" onChange={this.handleChange} onBlur={this.handleOnBlur} value={todoList.name} />
                    </div>
                    <div className="input-field col s6">
                        <label className="active" htmlFor="password">Owner</label>
                        <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} onBlur={this.handleOnBlur} value={todoList.owner} />
                    </div>
                </div>
                <div className="row z-depth-2 list-screen-sorts grey darken-3 hoverable">
                    <button className="btn-flat col s3 item_header white-text" onClick={this.sortItemsByTask}>Task</button>
                    <button className="btn-flat col s2 offset-s1 white-text item_header" onClick={this.sortItemsByDueDate}>Due Date</button>
                    <button className="btn-flat col s2 white-text item_header" onClick={this.sortItemsByStatus}>Status</button>
                </div>
                <ItemsList todoList={todoList} order={todoList.order ? todoList.order : ''}/>
                <button className="add-item grey darken-3 material-icons z-depth-2 hoverable" onClick={this.addItem} id={todoList.id}> 
                    <i className="material-icons add-item-container">add_circle_outline</i> 
                </button>
                <div id="modal1" className="modal">
                  <div className="modal-content">
                    <h4>Delete List</h4>
                    <p>Are you sure you want to delete this list?</p>
                  </div>
                  <div id="modal-footer1" className="modal-footer">
                    <div id="modal-close" onClick={this.handleDelete} className="modal-close waves-effect waves-green btn-flat green accent-3">Accept</div>
                    <div id="modal-close" className="modal-close waves-effect waves-green btn-flat grey darken-3">Cancel</div>
                    <p>The list will not be retreivable.</p>
                  </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(!todoLists) {
    return {
        todoList: null,
        auth: state.firebase.auth
    }
  }
  todoList.id = id;
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    fieldChange: (value, bool, todoList) => dispatch(fieldChangeHandler(value, bool, todoList)),
    deleteHandler: (todoList) => dispatch(deleteListHandler(todoList)),
    handleSort: (todoList, order) => dispatch(sortingHandler(todoList, order)),
    updateTime: (todoList) => dispatch(updateTimeHandler(todoList))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);