const express = require("express");
const mongoose = require("mongoose");

//Import Routes

const contactRoutes = require("./Routes/contactRoute");

//Config App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// blablabla
//Routes Middleware
app.use("/api/contact", contactRoutes);


