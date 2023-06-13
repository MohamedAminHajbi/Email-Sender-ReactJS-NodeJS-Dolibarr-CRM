const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const dbConfig ={
  host : 'localhost',
  user : 'dolibarrmysql',
  port : 3306,
  password: '11629747',
  database : 'dolibarr'
}
const connection = mysql.createConnection(dbConfig);
connection.connect((err)=>{
  if (err) {
    console.log("Error connection to database");
  }
  else{
    console.log("Connected to database");
  }
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'mohamedaminehajbi6@gmail.com',
    pass: 'qmsqyntspssuwlir',
  },
});


app.post('/send-email', upload.array('files',10),(req, res) => {
  const { subject, to, mail } = req.body;
  const files = req.files;

  let query;
  switch (parseInt(to)){
    case 1:
      query = `SELECT email FROM llx_societe WHERE client = 2 OR client = 3`;
      break;
    case 2:
      query = `SELECT email FROM llx_societe WHERE client = 1 OR client = 3`;
      break;
    case 3:
      query = `SELECT email FROM llx_societe WHERE fournisseur = 1`;
      break;
    default:
      res.status(400).send("Invalid");
      return;
  }
  connection.query(query,(err,results) => {
    if(err){
      console.log(err);
      res.status(500).send("Error fetching emails");
    }
    else{
      const emails = results.map((result) => result.email);
      const mailOptions = {
        from: 'mohamedaminehajbi6@gmail.com',
        to: emails.join(','),
        subject: subject,
        text: mail,
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
  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});