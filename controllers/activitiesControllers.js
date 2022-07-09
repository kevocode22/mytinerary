const Activities = require('../models/activity')


const activitiesControllers = {

    getActivities: async (req, res) => {
        let activities
        let error = null
        try {
            activities = await Activities.find().populate('itinerary')
        } catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : { activities },
            success: error ? false : true,
            error: error
        })
    },

    getOneActivity: async (req, res) => {
        const id = req.params.id
        let activity
        let error = null
        try {
            activity = await Activities.findOne({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },

    addActivity: async (req, res) => {
        const {itinerary, activity, actPhoto}=req.body
        let activities
        let error = null
        try{
            activities = await new Activities({
                itinerary: itinerary,
                activity:activity,
                actPhoto:actPhoto
            }).save()
        }catch(err){error = err}
        res.json({
            response: error ? 'ERROR' : activities,
            success: error ? false : true,
            error: error
        })
    },

    modifyActivity: async (req, res) => {
        const id = req.params.id
        const activities = req.body
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Activities.findOneAndUpdate({ _id: id }, activities, { new: true })
        } catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : itinerarydb,
            success: error ? false : true,
            error: error
        })
    },

    removeActivity: async (req, res) => {
        const id = req.params.id
        let activities
        let error = null
        try {
            activities = await Activities.findOneAndDelete({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : activities,
            success: error ? false : true,
            error: error
        })
    },

    getOneActivityByItinerary: async(req,res) => {
        const {id} = req.body
        let activities
        let error = null
        try{
            activities = await Activities.find({itinerary:id})
        }catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : activities,
            success: error ? false : true,
            error: error
        })

    }
}

module.exports = activitiesControllers;