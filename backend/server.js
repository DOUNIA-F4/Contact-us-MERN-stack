const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//Import Routes

const contactRoutes = require("./Routes/contactRoute");
// const PORT = process.env.PORT || 5000;
//Config App
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log("kgjhykcytk" + err));

// blablabla
//Routes Middleware
app.use("/api/contact", contactRoutes);

app.listen(process.env.PORT, () => console.log(process.env.PORT));
