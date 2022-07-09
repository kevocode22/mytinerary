const Itineraries = require('../models/itinerary')

const itinerariesControllers = {

    getItineraries: async (req, res) => {
        let itineraries
        let error = null
        try {
            itineraries = await Itineraries.find().populate("activities")
        } catch (err) { error = err }
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
            itineraries = await Itineraries.findOne({ _id: id }).populate("activities")
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
        const { itinerary, author, price, hashtags, duration, likes, activities, city } = req.body
        let itineraries
        let error = null
        try {
            itineraries = await new Itineraries({
                itinerary: itinerary,
                author: author,
                price: price,
                hashtags: hashtags,
                duration: duration,
                likes: likes,
                activities: activities,
                city: city
            }).save()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })
    },

    modifyItinerary: async (req, res) => {
        const id = req.body.id
        const itineraries = req.body
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Itineraries.findOneAndUpdate({ _id: id }, itineraries, { new: true })
        } catch (err) { error = err }
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
    },

    getOneItineraryByCity: async (req, res) => {
        const id = req.params.id
        let itineraries
        let error = null
        try {
            itineraries = await Itineraries.find({ city: id }).populate("activities").populate("comments.userId", { firstName: 1, photoUser: 1 })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })

    },

    likeDislike: async (req, res) => {
    const id= req.params.id
        const user = req.user.id
        console.log(id)
        await Itineraries.findOne({ _id: id })

            .then((itineraries) => {
                console.log(itineraries)
                if (itineraries.likes.includes(user)) {
                    console.log(itineraries)
                    Itineraries.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true })//PULL QUITA, SACA
                        .then((response) => res.json({ success: true, response: response.likes }))
                        .catch((error) => console.log(error))
                } else {
                    Itineraries.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })//PUSH AGREGA
                        .then((response) => res.json({ success: true, response: response.likes }))
                        .catch((error) => console.log(error))
                }
            })
            .catch((error) => res.json({ success: false, response: error }))
    },

}

module.exports = itinerariesControllers;