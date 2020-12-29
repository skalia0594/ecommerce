const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
require("dotenv/config");

const auth = {
    auth : {
        api_key: process.env.NODE_MAILER_API_KEY,
        domain: process.env.NODE_MAILER_DOMAIN
    }
}
const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (order, sendBack) => {
    //const mailBody =  '<div>'+order["address"]+'</div></body>';
    const mailOptions = {
        from: order["email"],
        to: process.env.ADMIN_EMAIL,
        subject: "Your received an Easytobuy order!",
        html: mailBody(order)
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            sendBack(err, null);
        }else {
            sendBack(null, data);
        }
    });
}
const mailBody = (order) => { 
return '<div>'+
    '<h3 className="success-message">New order has been placed with following details.</h3>'+
    '<div>Name:</div>'+
    '<div className="item">'+order["name"]+'</div>'+
    '<div>Address:</div>'+
    '<div className="item">'+order["address"]+'</div>'+
    '<div>Total:</div>'+
    '<div className="item">$'+order["total"]+'</div>'+
    '<div>Items:</div>'+
    '<div>'+order["cartItems"].map(item => " " +item["count"]+ 'x' + item["title"])+'</div>'+
    '</div>'
}   

module.exports = sendMail;