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
        let c = this.state.completed
        if(e.target.name === "completed") {
            this.setState({completed: !c});
            return;
        }
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
            <div className="container green lighten-5">
                <h3>Item</h3>
                <div className="item-field">
                    <div className="row">
                        <div className="col s2">Description:</div>
                        <input className="col s8 blue-grey lighten-5" name = "description" type="input" value={this.state.description} onChange={this.handleChange} />
                    </div>
                    <div className="row">
                        <div className="col s2">Assigned To:</div>
                        <input className="col s8 blue-grey lighten-5" name = "assigned_to" type="input" value={this.state.assigned_to} onChange={this.handleChange} />
                    </div>
                    <div className="row">
                        <div className="col s2">Due Date:</div>
                        <input className="col s8 blue-grey lighten-5 date" name = "due_date" type="date" value={this.state.due_date} onChange={this.handleChange} />
                    </div>
                    <div className="row">
                        <div className="col s2">Completed: </div>
                        <button className="col s1" name="completed" onClick={this.handleChange}>{this.state.completed ? "true" : "false"}</button>
                    </div>    
                </div>
                <button className="green accent-3 black-text item-button" onClick={handleS}>Submit</button>
                <button className="grey darken-3 white-text item-button" onClick={handleC}>Cancel</button>
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