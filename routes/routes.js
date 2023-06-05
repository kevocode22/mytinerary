const Router = require('express').Router();
const validator = require('../config/validator')

const citiesControllers = require('../controllers/citiesControllers');
const {getCities, getOneCity, addCity, modifyCity, removeCity} = citiesControllers

const itinerariesControllers = require('../controllers/itinerariesControllers')
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, getOneItineraryByCity, likeDislike} = itinerariesControllers

const userControllers = require('../controllers/userControllers')
const { signUpUser,signInUser, verifyMail, verifyToken, getAllUsers} = userControllers

const activitiesControllers = require('../controllers/activitiesControllers')
const { getActivities, getOneActivity, addActivity, modifyActivity, removeActivity, getOneActivityByItinerary} = activitiesControllers

const commentControllers = require('../controllers/commentControllers')
const{addComment, modifyComment, deleteComment} = commentControllers

const passport = require('../config/passport');

/*Cities Routes*/
Router.route('/cities')
.get(getCities)
.post(addCity)

Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)


/*Itineraries Routes*/
Router.route('/itineraries')
.get(getItineraries)
.post(addItinerary)

Router.route('/itineraries/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route('/oneitinerarybycity/:id')
.get(getOneItineraryByCity)


/* Login/SignUp Routes */
Router.route('/auth/signup')
.post(validator, signUpUser)

Router.route ('/auth/login')
.post(signInUser)

Router.route('/verify/:string')
.get(verifyMail)

Router.route('/verifytoken')
.get(passport.authenticate('jwt',{ session:false }),verifyToken)


/*Activities Routes*/
Router.route('/activities')
.get(getActivities)
.post(addActivity)

Router.route('/activities/:id')
.delete(removeActivity)
.put(modifyActivity)
.get(getOneActivity)

Router.route('/activities/byitinerary')
.post(getOneActivityByItinerary)

/*Likes/Dislikes Routes*/
Router.route('/itineraries/likes/:id')
.put(passport.authenticate('jwt',{ session:false }),likeDislike)


/* Comments */
Router.route('/comments')
.post(passport.authenticate('jwt',{ session:false }),addComment)
.put(passport.authenticate('jwt',{ session:false }),modifyComment)

Router.route('/comments/:id')
.post(passport.authenticate('jwt',{ session:false }),deleteComment)

Router.route('/users')
.get(getAllUsers)

module.exports = Router
