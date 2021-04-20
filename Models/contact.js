const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    required: true,
  },

  prenom: {
    type: String,
    trim: true,
    required: true,
  },

  telephone: {
    type: Number,
    trim: true,
    required: true,
    maxLength: 15,
  },

  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  message: {
    type: String,
    trim: true,
    required: true,
    maxLength: 400,
  },
});
module.exports = mongoose.model("contact", contactSchema);
