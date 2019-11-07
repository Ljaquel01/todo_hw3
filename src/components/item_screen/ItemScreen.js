import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ItemScreen extends Component {
    state = {
        description: '',
        due_date: '',
        completed: false,
    }

    render() {
        return (
            <div className="container white">
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  
};

const mapDispatchToProps = dispatch => ({
    
});

export default compose(
  connect(null, null),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ItemScreen);