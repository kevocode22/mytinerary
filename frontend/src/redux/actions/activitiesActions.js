import axios from 'axios';

let url = 'https://mytinerary-zcp6.onrender.com'
// let url ='http://localhost:4000/'

const activityActions = {

    getActivities: () => {
        return async(dispatch, getState) => {
            const res = await axios.get(url+`api/activities`)
            dispatch({type:'GET_ACTIVITIES', payload:res.data.response.activities})
            console.log(res)
        }
    },

    addActivity: (itinerary,activity,actPhoto)=>{
        return async(dispatch,getState)=>{
            const answer = await axios.post(url+'api/activities',{itinerary,activity,actPhoto})
            dispatch({type:'ADD_ACTIVITY', payload:answer.data.response.activities})
        }
    },

    deleteActivity: (id) => {
        return async(dispatch, getState) => {
            try {
                const answer = await axios.delete(url+`api/activities/${id}`)
                dispatch({type:'DEL_ACTIVITY', payload:answer.data.response.activities})
            }catch (err) {
                console.log(err)
            }
        }
    },

    oneActivity: (id) => {
        return async(dispatch, getState) => {
            try {
                const answer = await axios.get(url+`api/activities/${id}`)
                dispatch({type:'ONE_ACTIVITY', payload:answer.data.response})
            }catch (err) {
                console.log(err)
            }
        }
    }, 

    findActivityFromItinerary: (id) => {
        return async () => {
            try {
                let res = await axios.post(url+`api/activities/byitinerary`, {id})
                console.log(res)
                return { //NO DESPACHA! RETURNA PARA SETEAR UN HOOK COMÚN
                    success: true, response: res.data.response.activities
                }
            }
            catch (error) {
                return {
                    success: false, response: error.messagge
                }
            }
        }
    }



}

export default activityActions