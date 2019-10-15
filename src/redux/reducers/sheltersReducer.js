const shelterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SHELTERS':
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default shelterReducer;
