import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { createTodoListHandler } from '../../store/database/asynchHandler'

class HomeScreen extends Component {

    handleNewList = (e) => {
        e.preventDefault();
        const newTodoList = {name: "Unknown", owner: "", items:[], order: ''}
        this.props.createTodoList(newTodoList)
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container home_box">
                <div className="row">
                    <div className="col s4 list_links">
                        <TodoListLinks />
                    </div>

                    <div className="col s8 banners">
                        <div id="banner" className="banner">
                            @todo<br />
                            List Manager
                        </div>
                        
                        <div className="home_new_list_container">
                            <div>
                                <button className="home_new_list_button white-text hoverable z-depth-1" onClick={this.handleNewList}>
                                    Create New List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createTodoList: (todoList) => dispatch(createTodoListHandler(todoList))    
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);