const mongoose = require("mongoose");
const CommonSchema = require("./common.model");

const CategorySchemaDef = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: false
    },
    slug: {
        type: String, 
        default: null
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    status: CommonSchema.status,
    created_by: CommonSchema.created_by
})
const CategoryModel = mongoose.model("Category", CategorySchemaDef)
module.exports = CategoryModel;