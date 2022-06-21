const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    itinerary:{type:String, required:true},
    author:{
            name:{ type:String, requireed: true},
            authorimg:{type:String, required:true}
        },
    price: {type:Number, required:true},
    hashtags:[String],
    duration:[Number],
    likes:[String],
    activities:{type:String, required:true}
})

const Itineraries = mongoose.model("itineraries", itinerarySchema)
module.exports = Itineraries
