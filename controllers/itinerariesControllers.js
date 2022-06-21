const Itineraries = require('../models/itinerary')

const itinerariesControllers = {

    getItineraries: async (req, res) => {
        let itineraries
        let error = null
        try {
            itineraries = await Itineraries.find()
        } catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },

    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itineraries
        let error = null
        try {
            itineraries = await Itineraries.findOne({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })
    },

    addItinerary: async (req, res) => {
        const {itinerary, author, price,hashtags,duration, likes, activities}=req.body
        let itineraries
        let error = null
        try{
            itineraries = await new Itineraries({
                itinerary:itinerary,
                author:author,
                price: price,
                hashtags:hashtags,
                duration:duration,
                likes:likes,
                activities:activities
            }).save()
        }catch(err){error = err}
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })
    },

    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const itineraries = req.body
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Itineraries.findOneAndUpdate({ _id: id }, itineraries, { new: true })
        } catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : itinerarydb,
            success: error ? false : true,
            error: error
        })
    },

    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itineraries
        let error = null
        try {
            itineraries = await Itineraries.findOneAndDelete({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })
    }
}

module.exports = itinerariesControllers;