const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        case "CREATE_TODO_LIST": 
            console.log("Succes")
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
        default:
            return state;
    }
};

export default todoListReducer;