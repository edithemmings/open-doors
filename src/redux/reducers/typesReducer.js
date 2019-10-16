const typesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TYPES':
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default typesReducer;
