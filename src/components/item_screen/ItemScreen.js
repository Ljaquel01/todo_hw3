import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { submitItemHandler, submitNewItemHandler, getIndex } from '../../store/database/asynchHandler';

class ItemScreen extends Component {
    
    state = {
        description: this.props.item ? this.props.item.description : "",
        assigned_to: this.props.item ? this.props.item.assigned_to : "",
        due_date: this.props.item ? this.props.item.due_date : "",
        completed: this.props.item ? this.props.item.completed : false,
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.submitItem(this.props.todoList, this.props.item, this.state)
        this.props.history.push('/todoList/' + this.props.todoList.id)
    }

    handleNewSubmit = (e) => {
        e.preventDefault()
        this.props.submitNewItem(this.props.todoList, this.state)
        this.props.history.push('/todoList/' + this.props.todoList.id)
    }

    handleCancel = (e) => {
        this.props.history.push('/todoList/' + this.props.todoList.id)
    }

    render() {
        const { auth, todoList, item } = this.props
        if(!auth.uid || !todoList ) { return <Redirect to="/" />; }

        let handleS = item ? this.handleSubmit : this.handleNewSubmit
        let handleC = this.handleCancel
        
        return (
            <div className="container white">
                <h3>Item</h3>
                <div>
                    <div>Description:</div>
                    <input name = "description" type="input" value={this.state.description} onChange={this.handleChange} />
                    <div>Assigned To:</div>
                    <input name = "assigned_to" type="input" value={this.state.assigned_to} onChange={this.handleChange} />
                    <div>Due Date:</div>
                    <input name = "due_date" type="date" value={this.state.due_date} onChange={this.handleChange} />
                    <div>Completed:</div>
                    <input name = "completed" type="checkbox" checked={this.state.completed} onChange={this.handleChange} />
                </div>
                <button onClick={handleS}>Submit</button>
                <button onClick={handleC}>Cancel</button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id, iid } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    if(!todoLists) {
        return { todoList: null, item: null, auth: state.firebase.auth}
    }
    todoList.id = id;
    let i = -1
    if(iid && todoList.items) { i = getIndex(todoList.items, iid) }
    const item = todoList.items ? iid ? todoList.items[i] : null : null 
    if(!item) {
        return { todoList: todoList, item: null, auth: state.firebase.auth}
    }
    return {
      todoList,
      item,
      auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => ({
    submitItem: (todoList, item, newItem) => dispatch(submitItemHandler(todoList, item, newItem)),
    submitNewItem: (todoList, newItem) => dispatch(submitNewItemHandler(todoList, newItem))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ItemScreen);