require('dotenv').config()
require('./config/database')
const express = require('express')
const Router = require('./routes/routes')
const PORT = 4000
const app = express()
const cors = require('cors')    
const passport = require('passport')


//middlewares
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use('/api', Router)
app.listen(PORT, ()=> console.log("Server Ready on PORT" + PORT));
