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
            dispatch({ type: 'GET_ONE_ITINERARY', payload: res.data.response })
        }
    },

    getOneItineraryByCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/oneitinerarybycity/${id}`)
            // console.log(res)
            dispatch({ type: 'ONE_ITINERARY_BY_CITY', payload: res.data.response })
        }
    },

    likeDislike: (id) => {
        const token = localStorage.getItem('token')
        return async () => {
            try {
                let response = await axios.put("http://localhost:4000/api/itineraries/likes/" + id, {},
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        }
                    })
                return response

            } catch (error) {
                console.log(error)
            }
        }
    },

    addComment: (comment) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.post(`http://localhost:4000/api/comments`, { comment },
                { headers: { 'Authorization': "Bearer " + token } }
            )
            dispatch({
                type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success }
            })
            return answer
        }
    },

    modifyComment: (comment) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.post(`http://localhost:4000/api/comments,`, { ...comment },
                { headers: { Authorization: "Bearer " + token } }
            )
            dispatch({
                type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success }
            })
            return answer.data.response
        }
    },

    deleteComment: (id) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.post(`http://localhost:4000/api/comments/` + id, {},
                { headers: { Authorization: "Bearer " + token } }
            )
            dispatch({
                type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success }
            })
            return answer.data.response
        }
    }

}

export default itinerariesActions