const nodemailer = require('nodemailer');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'dolibarrmysql',
  password: '11629747',
  database: 'dolibarr',
});

    // Create a transporter to send emails
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'mohamedaminehajbi6@gmail.com',
        pass: 'qmsqyntspssuwlir',
      },
    });
    var mailOptions = {
        from: 'mohamedaminehajbi6@gmail.com',
        to: "aminhajbi116@gmail.com",
        subject: "subject",
        text: "content",
    };

    // Iterate over recipients and send emails
    transporter.sendMail(
        mailOptions, function(error,info){
            if(error){
                console.log(error);
            } else {
                console.log('Email sent: '+ info.response);
            }
        }
      );
      
      
    

