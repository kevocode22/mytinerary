const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy 
const extractJwt = require('passport-jwt').ExtractJwt
 
const User = require('../models/user')

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), //Captura el elemento mediante el metodo Bearer de la cabecera
    secretOrKey: process.env.SECRET_KEY
},(jwt_payload,done)=>{

    User.findOne({_id:jwt_payload.id})
    
    .then(user => {
        
        if (user) {
           
            return done(null, user)
        } 
        else if (err) {
         
            return done(err, false);
        }
        else{
            return done(null, false)
        }
    })
    .catch(err => {
        console.log(err.status) //Este es el error que me llega como 401 por ejemplo.
        return done(err,false)
    })

}))