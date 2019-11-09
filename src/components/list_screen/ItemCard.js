import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props; 
        let value = "Completed"
        if(!item.completed) { value = "Pending" }
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card-title col s3">{item.description}</span>
                    <span className="col s3">{"Assigned To: " + item.assigned_to}</span>
                    <span className="col s3">{item.due_date}</span>
                    <span className="col s3">{value}</span>
                </div>
            </div>
        );
    }
}
export default ItemCard;