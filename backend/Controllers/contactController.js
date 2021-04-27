const contactmodel = require("../Models/contact");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.gmail.com",
    auth: {
      type: "custom",
      user: "dounia.lasfar1@gmail.com",
      pass: "DOUNIA1964",
    },
  })
);
module.exports = {
  list: function (req, res) {
    contactmodel
      .find({})
      .then(function (result) {
        res.json(result);
      })
      .catch((err) => res.json(err).status(500).end());
  },

  create: function (req, res) {
    const { nom, prenom, telephone, email, message } = req.body;
    contactmodel
      .insertMany([{ nom, prenom, telephone, email, message }])
      .then(function (result) {
        res.json(result);
      })
      .catch((err) => res.json(err).status(500).end());
  },
  findContact: async (req, res) => {
    const { date } = req.body;
    const { email } = req.body;
    // console.log(date);
    // console.log(new Date(date));
    try {
      if (date && email) {
        const result = await Contact.find({ email, date });
        if (result) return res.status(200).json(result);
      } else if (date && !email) {
        const result = await Contact.find({ date });
        if (result) return res.status(200).json(result);
      } else if (!date && email) {
        const result = await Contact.find({ email });
        if (result) return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  postreply: async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    try {
      const currentContact = await contactmodel.findOne({ _id: id });
      if (currentContact) {
        const mailOptions = {
          from: "dounia.lasfar1@gmail.com",
          to: currentContact.email,
          subject: "Mail",
          text: message,
        };
        const envoiMail = await transporter.sendMail(mailOptions);
        if (envoiMail) res.status(200).json("Mail sent");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  singleContact: async (req, res) => {
    const { id } = req.params;
    try {
      const currentContact = await contactmodel.findOne({ _id: id });
      if (currentContact) return res.status(200).json(currentContact);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
