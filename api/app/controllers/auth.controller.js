const AuthService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const Config = require("../../config/config");
const nodemailer = require("nodemailer");
const sendEmail = require("../services/mail.service");

class AuthController{
    constructor(){
        this.auth_svc = new AuthService();
    }
    login =  async (req, res, next) => {
        try {
            let data = req.body;
            // DB Find 
            let user = await this.auth_svc.loginUser(data.email, data.password);

            if(user) {
                // hash generate 
                if(bcrypt.compareSync(data.password, user.password)){
                    // 
                    res.json({
                        result: {
                            deatil: user,
                            token: Jwt.sign({id: user._id}, Config.JWT_SECRET)
                        },
                        status: true, 
                        msg: "Logged in successfully."
                    })
                } else {
                    throw "Credentials does not"
                }
            } else {
                throw "User does not exists."
            }
            
        } catch(error) {
            next({
                status: 400, msg: error
            })
        }
    }

    register =async (req, res, next) => {
        try{
            let data = req.body
            // console.log(req.file);
            await this.auth_svc.validateRegisterData(data);
            // storage 
            
            // // DB Store
            // // First step: DB Connection 
            // MongoClient.connect(dbUrl)      // this function connects the db
            //     .then((client) => {
            //         // Second Step: Select the db 
            //         let db = client.db(dbName);
                    
            //         // Third Step: Query in the db
            //         return db.collection("users").insertOne(data)
            //     }) 
            //     .then((writeConcern) => {
            //         res.json({
            //             result: data,
            //             status: true,
            //             msg: "User registered successfully."
            //         })
            //     })
            //     .catch((error) => {
            //         next({status: 500, msg: error})
            //     })
            data.password =  bcrypt.hashSync(data.password, 10);       // encrypt
            let response = await this.auth_svc.registerUser(data);
            // mailer 

            sendEmail({
                to: data.email,
                subject: "Account registered",
                text: "Plaintext version of the message",
                html: `<p style="background-color: red">Dear ${data.name}, You have been registered in our applicaiton.</p>`
            })


            res.json({
                result: {
                    response: response
                },
                status: true,
                msg: "Registered user successfully."
            })
        } catch(error) {
            console.log(error);
            next({status: 400, msg: error})
        }

    }

    getLoggedInUser = async (req, res, next) => {
        res.json({
            result: req.auth_user,
            status: true, 
            msg: "Logged in user fetched"
        })    
    }
}

module.exports = AuthController;