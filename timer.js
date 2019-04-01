"use strict";
const nodemailer = require("nodemailer");
const moment = require("moment");

var date = moment("2019-04-02")
var hours = moment().diff(date, 'hours')

const CheckReload = (() => {
  return () => {
    return hours = moment().diff(date, 'hours')
  };
})();

{
const refreshId = setInterval(
  () => {
    const hours = CheckReload();
    sendMailFunc(hours).catch(console.error)
    if (hours >= 0) {
      clearInterval(refreshId);
    }
  },
  3600000
);
}
//pankhuriagarwal@outlook.com
async function sendMailFunc(hours){
  console.log(-hours);
  let days = Math.floor(-hours/24);
  let hoursnew = -hours%24;
  console.log(days, hoursnew);
  let account = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "mailcluster.loopia.se",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'no-reply@yogateket.com', // generated ethereal user
      pass: 'Waflni31' // generated ethereal password
    }
  });
  let mailOptions = {
    from: '"Ayush" <ayushpantpp@gmail.com>', // sender address
    to: "ayushpantpp@gmail.com, pankhuriagarwal@outlook.com, pankhuri.agarwal@delhivery.com ", // list of receivers
    //to: "ayushpantpp@gmail.com", // list of receivers
    subject: "It's Celebration Time !!!!  ✔", // Subject line
    text: "Your Birthday is in" + days + hoursnew + "only", // plain text body
    html: "<b>Hi Dear , </br> </br></br> <b>Your Birthday is in " + days + " Days and " + hoursnew + " hours " + " only "+" Hope you are having a great time!!</b> "// html body
  };
  let info = await transporter.sendMail(mailOptions)
  console.log('Mail Sent');
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
sendMailFunc(hours).catch(console.error);
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));


