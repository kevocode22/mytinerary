const initialState = {
    cities: [],
    auxiliar: []
}

const citiesReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_CITIES':
            return {
                ...state,
                cities: action.payload,
                auxiliar: action.payload
            }
        default: return state
    }
}

export default citiesReducer;