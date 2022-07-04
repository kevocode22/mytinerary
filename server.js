require('dotenv').config()
require('./config/passport')
const passport = require('passport')
require('./config/database')
const express = require('express')
const Router = require('./routes/routes')
const PORT = 4000
const app = express()
const cors = require('cors')    

//middlewares
app.use(cors())
app.use(passport.initialize())
app.use(express.json())
app.use('/api', Router)
app.listen(PORT, ()=> console.log("Server Ready on PORT" + PORT));
