import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        return (
            <div className="card z-depth-1 todo-list-link green lighten-5 hoverable">
                <div className="card-content grey-text text-darken-4">
                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;