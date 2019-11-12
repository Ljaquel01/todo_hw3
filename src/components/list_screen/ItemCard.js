import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props; 
        let compl = <div className="col s2 field completed green-text accent-3">Completed</div>
        if(!item.completed) { 
            compl = <div className="col s2 field completed red-text">Pending</div>
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
                </div>
            </div>
        );
    }
}
export default ItemCard;