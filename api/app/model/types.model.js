const mongoose = require("mongoose");
const CommonSchema = require("./common.model");

const TypeSchemaDef = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    link: {
        type: String, 
        default: null
    },
    type: {
        type: String, 
        enum: ['brand', 'banner'],
        default: "banner"
    },
    status: CommonSchema.status,
    created_by: CommonSchema.created_by
})
const TypeModel = mongoose.model("Type", TypeSchemaDef)
module.exports = TypeModel;