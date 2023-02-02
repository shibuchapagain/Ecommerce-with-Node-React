const mongoose = require("mongoose");
const OrderModelDef = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    cart: [{
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        qty:{
            type: Number, 
            required: true,
        },
        total_amt: {
            type: Number, 
            required: true
        }
    }],
    sub_total: {
        type: Number, 
        required: true,
        min: 1
    },
    discount: {
        type: Number, 
        min: 0
    },
    delivery_charge:{
        type: Number,
        min: 0
    },
    total_amount: {
        type: Number,
        min: 1
    },
    status: {
        type: String, 
        enum: ['pending', "verify",'processing',"cancelled","delivered"],
        default: "pending"
    },
    is_paid: {
        type: Boolean,
        default: false
    }
});

const OrderModel = mongoose.model("Order", OrderModelDef);
module.exports = OrderModel;