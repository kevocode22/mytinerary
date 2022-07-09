const Itineraries = require('../models/itinerary')

const commentControllers = {

    addComment: async (req, res) => {
        const { comment, itineraryId } = req.body.comment
        const user = req.user.id
        console.log(user)
        try {
            const newComment = await Itineraries.findOneAndUpdate({ _id: itineraryId }, { $push: { comments: { comment: comment, userId: user } } }, { new: true })
            res.json({ success: true, response: { newComment }, message: "gracias por dejarnos tu comentario" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo ha salido mal intentalo en unos minutos" })
        }
    },

    modifyComment: async (req, res) => {
        const { commentId, comments } = req.body
        try {
            const modifyComment = await Itineraries
                .findOneAndUpdate({ "comments._id": commentId }, { $set: { "comments.$.comment": comments.comment } }, { new: true })
            res.json({
                success: true,
                response: { modifyComment },
                message: "the comment has been modified"
            })
        }
        catch (error) {
            console.log(error)
            res.json({
                success: true,
                message: "Sorry! try again!"
            })
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
                message: "Try again!"
            })
        }
    }
}

module.exports = commentControllers