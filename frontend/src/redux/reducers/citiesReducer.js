const initialState = {
    cities: [],
    oneCity:{}
}

const citiesReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_CITIES':
            return {
                ...state,
                cities: action.payload,
            }    
        case 'GET_ONE_CITY':
            return{
                ...state,
                oneCity:action.payload,
            }
            default: return state
}
}

export default citiesReducer