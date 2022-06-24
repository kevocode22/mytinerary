const initialState = {
    cities: [],
    oneCity: {},
    filter:[]
}

const citiesReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_CITIES':
            return {
                ...state,
                cities: action.payload,
                filter:action.payload
            }

        case 'GET_ONE_CITY':
            return {
                ...state,
                oneCity: action.payload,
            }

        case 'FILTER_CITIES':
            let cityFilter = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return {
                ...state,
                filter: cityFilter
            }

        default: return state
    }
}

export default citiesReducer