const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json()); // Add this line to parse JSON data from the request body

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'mohamedaminehajbi6@gmail.com',
    pass: 'qmsqyntspssuwlir',
  },
});

app.post('/send-email', (req, res) => {
  const { subject, to, mail } = req.body;

  const mailOptions = {
    from: 'mohamedaminehajbi6@gmail.com',
    to: to,
    subject: subject,
    text: mail,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
