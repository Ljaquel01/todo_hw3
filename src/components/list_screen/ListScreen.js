import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { fieldChangeHandler } from '../../store/database/asynchHandler'

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
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

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} onBlur={this.handleOnBlur} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} onBlur={this.handleOnBlur} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;
  console.log(todoLists)

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    fieldChange: (value, bool, todoList) => dispatch(fieldChangeHandler(value, bool, todoList)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);