import axios from 'axios'

const itinerariesActions = {
    getItineraries: () => {
        return async (dispatch, getState) => {
            const res = await axios.get('http://localhost:4000/api/itineraries')
            dispatch({ type: 'GET_ITINERARIES', payload: res.data.response.itineraries })
        }
    },

    getOneItinerary: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/itineraries/${id}`)
            dispatch({ type: 'GET_ONE_ITINERARY', payload: res.data.response})
        }
    },

    getOneItineraryByCity: (id) => {
        return async(dispatch,getState) => {
            const res = await axios.get(`http://localhost:4000/api/itinerariesbycity/${id}`)
            dispatch ({type: 'GET_ONE_ITINERARY_BY_CITY', payload: res.data.response})
        }
    }
}

export default itinerariesActions