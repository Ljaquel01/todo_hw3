import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        items.map(item => ( item.id = item.key ))
        return (
            <div className="todo-lists section">
                {items && items.map(item => (
                    <NavLink to={{
                        pathname: '/todoList/'+ todoList.id + '/todoItem/' + item.key,
                        state: {isNew: false}
                    }} key={item.key}>
                        <ItemCard todoList={todoList} item={item}/>
                    </NavLink>     
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);