const contactmodel = require("../Models/contact");

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
  sendMail: async function (req, res) {
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dounia.lasfar1@gmail.com",
        pass: "DOUNIA1964",
      },
    });

    let mailOptions = await transporter.sendMail({
      from: "Fatimaezzahrazahid1997@gmail.com",
      to: "dounia.lasfar1@gmail.com",
      subject: "test",
      text: "hi dounia",
    });
    if (mailOptions) {
      res.status(200).send("mail envoyer");
    } else {
      res.status(200).send("echoue envoi mail");
    }
  },
};

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
