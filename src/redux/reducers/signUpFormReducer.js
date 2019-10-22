const signUpForm = (state = {}, action) => {
    switch (action.type) {
        case 'HOURS_FORM':
            console.log(action.payload)
            return {...state, hours: action.payload}; 
        case 'TYPES_FORM':
            console.log(action.payload)
            return { ...state, types: action.payload };
        case 'TAGS_FORM':
            console.log(action.payload)
            return { ...state, tags: action.payload }; 
        case 'ID_FOR_FORM':
            console.log(action.payload)
            return { ...state, id: action.payload }; 
        default:
            return state;
    }
};

export default signUpForm;
