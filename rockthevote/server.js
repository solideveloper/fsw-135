const express = require('express')
const app = express()
require('dotenv').config()
const expressJwt = require('express-jwt')
const mongoose = require('mongoose')
const morgan = require('morgan')

//Middleware
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
  'mongodb://localhost:27017/rockthevote',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to the DB')
);

//Routes
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']}))
app.use("/api/user", require("./routes/userRouter.js"))
app.use("/auth", require("./routes/authRouter.js"))
app.use("/api/issues", require('./routes/issueRouter.js'))
app.use("/api/comments", require("./routes/commentRouter.js"))

//Error Handler
app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "Unauthorized Error"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(9000, () => {
  console.log("Server is running on Port: 9000")
})