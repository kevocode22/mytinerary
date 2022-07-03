const Router = require('express').Router();
const validator = require('../config/validator')

const citiesControllers = require('../controllers/citiesControllers');
const {getCities, getOneCity, addCity, modifyCity, removeCity} = citiesControllers

const itinerariesControllers = require('../controllers/itinerariesControllers')
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, getOneItineraryByCity} = itinerariesControllers

const userControllers = require('../controllers/userControllers')
const { signUpUser,signInUser, verifyMail, verifyToken} = userControllers

const passport = require('../config/passport')

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

Router.route('/itinerariesbycity/:id')
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

module.exports = Router
