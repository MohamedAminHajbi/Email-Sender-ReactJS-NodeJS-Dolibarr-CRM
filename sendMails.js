const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
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


app.post('/send-email', upload.single('file'),(req, res) => {
  const { subject, to, mail } = req.body;
  const file = req.file;

  const mailOptions = {
    from: 'mohamedaminehajbi6@gmail.com',
    to: to,
    subject: subject,
    text: mail,
    attachments: [{
      filename: file.originalname,
      path:file.path
    }]
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
