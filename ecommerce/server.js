const express = require("express");
const morgan = require("morgan");
const app = express()
const mongoose = require("mongoose");

app.use(express.json());
app.use(morgan("dev"));


//Connect to MongoDB
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/inventory');
    console.log("Connected to the DB")
}

// Routes //
app.use("/inventory", require('./routes/storeRouter.js'))

//Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.send({ errMsg: err.message });
});


//Server Listen
app.listen(9000, () => {
  console.log("The server is running on Port 9000");
});
