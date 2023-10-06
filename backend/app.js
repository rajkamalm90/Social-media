const express = require('express');
const app = express()
const port = 5000;
 const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");

app.use(cors())
require('./models/model')
  require('./models/post')
app.use(express.json())
 app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/flowingroute"))
app.use(require("./routes/user"))

  mongoose.connect("mongodb://127.0.0.1:27017/hpdb");

  mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
 })
mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
 })

 app.listen(port, () => {
    console.log("server is running on port" + " " + port)
})