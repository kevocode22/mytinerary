const Router = require('express').Router();

const citiesControllers = require('../controllers/citiesControllers');
const {getCities, getOneCity, addCity, modifyCity, removeCity} = citiesControllers

const itinerariesControllers = require('../controllers/itinerariesControllers')
const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, getOneItineraryByCity} = itinerariesControllers


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

module.exports = Router
