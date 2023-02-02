const mongoose = require("mongoose");
const UserSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    image: String, 
    address: {
        billing: String,
        shipping: String
    },
    role: {
        type: String, 
        required: true, 
        enum: ["admin",'customer','seller'],
        default: "customer"
    },
    status: {
        type: String, 
        required: true, 
        enum: ['active', 'suspended'],
        default: "suspended"
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    otp: {
        type: String,
        default: null 
    },
    otp_time: {
        type: Date,
        default: Date.now()
    }
},{
    autoCreate: true, 
    autoIndex: true,
    timestamps: true
});
const UserModel = mongoose.model("User", UserSchemaDef);
module.exports = UserModel;