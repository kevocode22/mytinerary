const initialState = {
    itineraries: [],
    oneItinerary:{},
    oneItineraryByCity:[]
}

const itinerariesReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_ITINERARIES':
            return {
                ...state,
                itineraries: action.payload,
            }
            case 'GET_ONE_ITINERARY':
                return{
                    ...state,
                    oneItinerary:action.payload
                }
            case 'GET_ONE_ITINERARY_BY_CITY':
                return{
                    ...state,
                    oneItineraryByCity: action.payload
                }
            
                default: return state

        }
        
        }
        
        export default itinerariesReducer 