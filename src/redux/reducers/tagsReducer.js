const tagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            // console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default tagsReducer;
