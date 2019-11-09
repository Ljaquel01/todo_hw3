const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        case "CREATE_TODO_LIST":
            return state;
        case "CREATE_TODO_LIST_ERROR":
            console.log("ERROR", action.err)
            return state;
        case "NAME_CHANGE":
            return {
                ...state,
                name: action.name,
            }
        case "OWNER_CHANGE":
            return {
                ...state,
                owner: action.name,
            }
        case "NEW_ITEM":
            return state;
        case "CHANGE_ITEM":
            return state;
        case "CANCEL_ITEM":
            return state;
        default:
            return state;
    }
};

export default todoListReducer;