const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Add this line to parse JSON data from the request body

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'mohamedaminehajbi6@gmail.com',
    pass: 'qmsqyntspssuwlir',
  },
});
var storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null , './images')
  },
  filename:function(req,file,callback){
    callback(null,file.filename + "_" + Date.now() + "_" + file.originalname)
  }
})
var upload = multer({
  storage: storage
}).single('image');
app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }
    console.log('File uploaded successfully');
    res.send(req.file.path);
  });
});

app.post('/send-email', (req, res) => {
  const { subject, to, mail , filePath } = req.body;

  const mailOptions = {
    from: 'mohamedaminehajbi6@gmail.com',
    to: to,
    subject: subject,
    text: mail,
    attachments: [{
      path:filePath
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
