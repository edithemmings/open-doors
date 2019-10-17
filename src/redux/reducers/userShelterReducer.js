const userShelterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_SHELTER':
            // console.log(action.payload)
            return { ...state, ...action.payload[0] };
        case 'SET_USER_MOREINFO':
            // console.log(action.payload)
            return {...state, ...action.payload[0]};
        default:
            return state;
    }
};

export default userShelterReducer;
