const UserModel = require("../model/user.model");

class AuthService{
    
    validateRegisterData =async (data) => {
        // name => "Name"
    
        let err_msg = {};
        if(!data.name) {
            err_msg.name = "Name field is required";
        }
        
        if(!data.email) {
            err_msg.email = "Email field is required";
        } else if(!String(data.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            err_msg.email = "Invalid Email Format";
        }

        if(!data.password) {
            err_msg.password = "Password field is required";
        } else if(!(String(data.password).match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/))) {
            // 
            err_msg.password = "Password must contain atleast one Uppercase, one lowercase character, one number and one symbol"
        }
        
        if(!data.role) {
            err_msg.role = "Role field is required";
        } else if(!["admin","seller",'customer'].includes(data.role)){
            err_msg.role = "User role can be admin, seller or customer";
        }
        if(Object.keys(err_msg).length === 0){
            return null;
        } else {
            throw err_msg;
        }
    }

    loginUser =async (username, password) => {
        try {
            let user = await UserModel.findOne({
                email: username
            })
            if(!user){
                throw "Credentials does not match"
            } else {
                return user;
            }
        } catch(error) {
            throw error
        }
    }

    registerUser = async (data) => {
        try {
            let user = new UserModel(data);
            let res = await user.save();
            return res;
        } catch(err) {
            if(err.code === 11000) {
                // validation keys 
                let keys = Object.keys(err.keyValue);   
                throw keys.join(", ")+" address should be unique"
            } else {
                throw err;
            }
        }
    }
}

module.exports = AuthService;