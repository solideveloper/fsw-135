const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');

// Middleware (for every request) //
app.use(express.json()) 
app.use(morgan('dev')) 

//Connect to database
mongoose.connect('mongodb://localhost:27017/moviesdb', //moviesdb is name of database
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false
    }, //mongoosejs.com/docs/deprecations.html 
    () => console.log("Connected to the database")
)

// Routes //
app.use("/movies", require("./routes/movieRouter.js"))
app.use("/tvshows", require('./routes/tvshowRouter.js'))

// Error handler
app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})

// Server Listen //
app.listen(9000, () => {
  console.log("The server is running on Port 9000")
})