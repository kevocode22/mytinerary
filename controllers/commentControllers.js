const Itineraries = require('../models/itinerary')

const commentControllers = {

    addComment: async (req, res) => {
        const { comment, itineraryId } = req.body.comment
        const user = req.user.id
        console.log(user)
        try {
            const newComment = await Itineraries.findOneAndUpdate({ _id: itineraryId }, { $push: { comments: { comment: comment, userId: user } } }, { new: true })
            res.json({ success: true, response: { newComment }, message: "Thanks for your comment" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "You must be logged in to comment" })
        }
    },

    modifyComment:  async (req, res) => {
        const {commentId,comment} = req.body.comment
        const user = req.user._id
        try {
            const newComment = await Itineraries.findOneAndUpdate({"comments._id":commentId}, {$set: {"comments.$.comment": comment,"comments.$.date": Date.now() }}, {new: true})
            console.log(newComment)
            res.json({ success: true, response:{newComment}, message:"Your comment has been modified" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message: "First, you need to edit your comment" })
        }
    },

    deleteComment: async (req, res) => {

        const commentId = req.params.id
        try {
            const deleteComment = await Itineraries
                .findOneAndUpdate({ "comments._id": commentId }, { $pull: { comments: { _id: commentId } } }, { new: true })
            res.json({
                success: true,
                response: { deleteComment },
                message: "The comment has been deleted"
            })
        }
        catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: "Please, try again!"
            })
        }
    }
}

module.exports = commentControllers