const userShelterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_SHELTER':
            // console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default userShelterReducer;
