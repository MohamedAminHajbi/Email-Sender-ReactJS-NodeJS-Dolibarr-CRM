const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: '',
    port: 465,
    secure: true,
    auth: {
      user: '',
      pass: '',
    },
  })
  );


app.post('/send-email', upload.array('files',10),(req, res) => {
  const { subject, to, mail } = req.body;
  const files = req.files;

    const mailOptions = {
      from: '',
      to: to,
      subject: subject,
      html: mail,
      attachments: []
    };
    if (files && files.length > 0) {
      files.forEach((file) => {
        mailOptions.attachments.push({
          filename: file.originalname,
          path: file.path,
        });
      });
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent');
      }
    });
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});