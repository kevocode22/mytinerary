const mongoose = require('mongoose')


const activitySchema = new mongoose.Schema ({ 
    itinerary: {
        type: mongoose.Types.ObjectId,ref: "itineraries",
        required: true,
      },
    activity: {type:String, required:true},
    actPhoto: {type:String, required:true}    
})

const Activity = mongoose.model("activities", activitySchema)
module.exports = Activity
