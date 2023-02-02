const Jwt = require("jsonwebtoken");
const Config = require("../../config/config");
const UserModel = require("../model/user.model");

const loginCheck = async (req, res, next) => {
    try{
        let token = null;
        if(req.headers['authorization']){
            token = req.headers['authorization'];
        }

        if(!token) {
            // unauthorized
            next({
                status: 401, msg: "Please login first"
            })
        } else {
            let parts = token.split(" ");
            token = parts.pop();
            if(!token) {
                next({status: 401, status: "Token not provided"})
            } else {
                // success 
                let data = Jwt.verify(token, Config.JWT_SECRET);
                if(data){
                    let user =await UserModel.findById(data.id)
                    if(user) {
                        // logged in user 
                        req.auth_user = user;
                        next();
                    } else {
                        next({status: 404, msg: "User does not exists"})
                    }
                } else {
                    next({status: 401, msg: "Invalid Token"})
                }
            }
        }
    } catch(error) {
        //remember 
        next({status: 401, msg: error})
    }
}
module.exports = loginCheck;