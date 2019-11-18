import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteItemHandler, moveItemHandler } from '../../store/database/asynchHandler'

class ItemCard extends React.Component {

    handleMoveItem = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const { id } = e.target
        const { item, todoList } = this.props
        this.props.handleMoveItem(todoList, item, id);
    }

    handleDeleteItem = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const { item, todoList } = this.props
        this.props.handleDeleteItem(todoList, item);
    }

    render() {
        const { todoList, item } = this.props; 
        let compl = <div className="col s2 field completed green-text accent-3">Completed</div>
        if(!item.completed) { 
            compl = <div className="col s2 field completed red-text">Pending</div>
        }
        var up = <li><div onClick={this.handleMoveItem} className="btn-floating black"><i id="up" className="material-icons">arrow_upward</i></div></li>
        var down = <li><div onClick={this.handleMoveItem} className="btn-floating grey darken-4"><i id="down" className="material-icons">arrow_downward</i></div></li>
        if(todoList.items[0].id === item.id) {
            up = <li><div onClick={this.handleMoveItem} className="btn-floating grey darken-5 disabled"><i id="up" className="material-icons">arrow_upward</i></div></li>
        }
        if(todoList.items[todoList.items.length-1].id === item.id ) {
            down = <li><div onClick={this.handleMoveItem} className="btn-floating grey darken-4 disabled"><i id="down" className="material-icons">arrow_downward</i></div></li>
        }
        return (
            <div id="todo-item-link" className="card z-depth-1 todo-list-link teal lighten-5 hoverable">
                <div className="divider"></div>
                <div id="todo-item-link-content" className="grey-text text-darken-4 row">
                    <div className="col s4 row truncate">
                        <div className="card-title col s12 truncate"> {item.description} </div>
                        <div className="col s12"> {"Assigned To: " + item.assigned_to} </div>
                    </div>
                    <div className="col s2 field">{item.due_date}</div>
                    {compl}
                    <div className="col s4 row">
                        <div className="fixed-action-btn FAB col s3 offset-s9">
                            <div className="btn-floating btn-large green accent-3">
                                <i className="large material-icons">menu</i>
                            </div>
                            <ul>
                              {up}
                              {down}
                              <li><div onClick={this.handleDeleteItem} className="btn-floating grey darken-3"><i className="material-icons">delete</i></div></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    handleMoveItem: (todoList, item, name) => dispatch(moveItemHandler(todoList, item, name)),
    handleDeleteItem: (todoList, item) => dispatch(deleteItemHandler(todoList, item))
});

export default compose(
    connect(null, mapDispatchToProps),
)(ItemCard);