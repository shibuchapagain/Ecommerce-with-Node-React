const nodemailer = require("nodemailer");
const Config = require("../../config/config");

const sendEmail = async (options={}) => {
    try{
        var transport = nodemailer.createTransport({
            host: Config.SMTP_HOST,
            port: Config.SMTP_PORT,
            secure: Config.SMTP_TLS,
            auth: {
              user: Config.SMTP_USER,
              pass: Config.SMTP_PASSWORD
            }
        });
    
    
        let mail = await transport.sendMail({
            from: Config.SMTP_FROM,
            ...options
        })

        return mail;

    } catch(exep) {
        console.log("Mail: "+exep)
        return null
    }

}
module.exports = sendEmail;