import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';

export const ItemSortCriteria = {
    SORT_BY_TASK_DECREASING: "SORT_BY_TASK_DECREASING",
    SORT_BY_TASK_INCREASING: "SORT_BY_TASK_INCREASING",
    SORT_BY_DUE_DATE_DECREASING: "SORT_BY_DUE_DATE_DECREASING",
    SORT_BY_DUE_DATE_INCREASING: "SORT_BY_DUE_DATE_INCREASING",
    SORT_BY_STATUS_DECREASING: "SORT_BY_STATUS_DECREASING",
    SORT_BY_STATUS_INCREASING: "SORT_BY_STATUS_INCREASING"
}

export const comp = (order) => (item1, item2) => {
    let current = order;
    if (current === ItemSortCriteria.SORT_BY_TASK_DECREASING
        || current === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING
        || current === ItemSortCriteria.SORT_BY_STATUS_DECREASING) {
        let temp = item1;
        item1 = item2;
        item2 = temp;
    }
    if (current === ItemSortCriteria.SORT_BY_TASK_INCREASING
        || current === ItemSortCriteria.SORT_BY_TASK_DECREASING) {
        if (item1.description < item2.description)
            return -1;
        else if (item1.description > item2.description)
            return 1;
        else
            return 0;
    }
    else if (current === ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING
        || current === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING) {
        let dueDate1 = item1.due_date;
        let dueDate2 = item2.due_date;
        let date1 = new Date(dueDate1);
        let date2 = new Date(dueDate2);
        if (date1 < date2)
            return -1;
        else if (date1 > date2)
            return 1;
        else
            return 0;
    }
    else {
        if (item1.completed < item2.completed)
            return -1;
        else if (item1.completed > item2.completed)
            return 1;
        else
            return 0;
    }
}

class ItemsList extends React.Component {

    render() {
        const { todoList } = this.props;
        // const { order } = this.props;
        const items = todoList.items;
        //if(order !== '') { items.sort(comp(order)); }
        items.map(item => ( item.id = item.key ))
        return (
            <div className="todo-lists section">
                {items && items.map(item => (
                    <NavLink to={'/todoList/'+ todoList.id + '/todoItem/' + item.key} key={item.key}>
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
        order: ownProps.order
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);