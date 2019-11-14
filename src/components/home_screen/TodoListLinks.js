import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';

class TodoListLinks extends React.Component {
    compare = (item1, item2) => {
        if (item1.lastModified < item2.lastModified) { return 1; }
        else if (item1.lastModified > item2.lastModified) { return -1; }
        else { return 0; }
    }

    render() {
        const todoLists = this.props.todoLists ? this.props.todoLists.sort(this.compare) : null
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);