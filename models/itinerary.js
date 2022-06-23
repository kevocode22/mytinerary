const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    itinerary:{type:String, required:true},
    author:{
            name:{ type:String, requireed: true},
            authorimg:{type:String, required:true}
        },
    price: {type:String, required:true},
    hashtags:[String],
    duration:[Number],
    likes:{type:String, required:false},
    activities:{type:String, required:false},
    city: {type: mongoose.Types.ObjectId , ref:'cities'},
})

const Itineraries = mongoose.model("itineraries", itinerarySchema)
module.exports = Itineraries
