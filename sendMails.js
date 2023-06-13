const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const dbConfig ={
  host : '127.0.0.1',
  user : 'root',
  port : 3306,
  password: '11629747',
  database : 'test'
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


app.post('/send-email', upload.single('file'),(req, res) => {
  const { subject, to, mail } = req.body;
  const file = req.file;

  let tableName;
  switch (parseInt(to)){
    case 1:
      tableName = "Prospect";
      break;
    case 2:
      tableName = "Client";
      break;
    case 3:
      tableName = "Fournisseur";
      break;
    default:
      res.status(400).send("Invalid");
      return;
  }
  const query = `SELECT mail FROM ${tableName}`;
  connection.query(query,(err,results) => {
    if(err){
      console.log(err);
      res.status(500).send("Error fetching emails");
    }
    else{
      const emails = results.map((result) => result.mail);
      const mailOptions = {
        from: 'mohamedaminehajbi6@gmail.com',
        to: emails.join(','),
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
    }
  })


  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
