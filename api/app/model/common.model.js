const mongoose = require("mongoose");

const CommonSchema = {
    status: {
        type: String,
        enum: ['active','inactive'],
        default: "inactive"
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
}

module.exports = CommonSchema;