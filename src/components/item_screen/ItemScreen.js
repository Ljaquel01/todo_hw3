import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { cancelItemHandler, changeItemHandler } from '../../store/database/asynchHandler';

class ItemScreen extends Component {
    
    state = {
        description: '',
        assigned_to: '',
        due_date: '',
        completed: false,
    }

    handleChange = (e) => {
        e.preventDefault()
        //let newItem = item
        const { name, value } = e.target;
        //if(name === "description") { newItem.description = value}
        //else if(name === "assigned_to") { newItem.assigned_to = value}
        //else if(name === "complete") { newItem.completed = value}
        //else if(name === "due_date") { newItem.due_date = value}
        
        //this.props.changeHandler();
    }

    handleSubmit = (e) => {

    }

    handleCancel = (backup, todoList) => {
        
    }

    handleNewCancel = (e) => {

    }

    render() {
        const { auth, todoList, item, isNew} = this.props
        if(!auth.uid || !todoList || !item) { return <Redirect to="/" />; }
        const { description, assigned_to, due_date, completed } = item
        let backup = item;
        let handleS = this.handleSubmit
        let handleC = isNew ? this.handleNewCancel : this.handleCancel.bind(backup, todoList, item)
        
        return (
            <div className="container white">
                <h3>Item</h3>
                <div>
                    <div>Description:</div>
                    <input name = "description" type="input" value={description} onChange={this.handleChange} />
                    <div>Assigned To:</div>
                    <input name = "assigned_to" type="input" value={assigned_to} onChange={this.handleChange} />
                    <div>Due Date:</div>
                    <input name = "due_date" type="date" value={due_date} onChange={this.handleChange} />
                    <div>Completed:</div>
                    <input name = "completed" type="checkbox" checked={completed} onChange={this.handleChange} />
                </div>
                <button onClick={handleS}>Submit</button>
                <button onClick={handleC}>Cancel</button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id, iid } = ownProps.match.params;
    const { isNew } = ownProps.location.state;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    if(!todoLists) {
        return { todoList: null, item: null, auth: state.firebase.auth, isNew }
    }
    todoList.id = id;
    const item = todoList.items ? todoList.items[iid] : null 
    if(!item) {
        return { todoList: null, item: null, auth: state.firebase.auth, isNew }
    }
    return {
      todoList,
      item,
      auth: state.firebase.auth,
      isNew
    }
};

const mapDispatchToProps = (dispatch) => ({
    cancelItem: (backup, todoList) => dispatch(cancelItemHandler(backup, todoList)),
    changeHandler: () => dispatch(changeItemHandler())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ItemScreen);