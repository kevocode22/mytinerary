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
    likes:{type:Array},
    activities:[{type: mongoose.Types.ObjectId, ref:"activities"}],
    city: {type: mongoose.Types.ObjectId , ref:'cities'},
    comments: [{
        comment: {type: String},
        userId: {type:mongoose.Types.ObjectId, ref:'users'}
    }]
})

const Itineraries = mongoose.model("itineraries", itinerarySchema)
module.exports = Itineraries
