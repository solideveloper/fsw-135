const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');


app.use(express.json());
app.use(morgan('dev'));


mongoose.connect(
    'mongodb://localhost:27017/rockthevote-db',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
() => console.log('Connected to the Database!'))

// Routes
app.use('/api/', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/user', require('./routes/userRouter.js'))
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/api/comments', require('./routes/commentRouter.js'))
app.use('/auth', require("./routes/authRouter.js"))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})


app.listen(9000, () => {
    console.log('Server is running on Port 9000')
})