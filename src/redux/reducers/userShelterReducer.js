const userShelterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_SHELTER':
            // console.log(action.payload)
            return action.payload[0];
        default:
            return state;
    }
};

export default userShelterReducer;
