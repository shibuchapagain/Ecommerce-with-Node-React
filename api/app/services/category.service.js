const CategoryModel = require("../model/category.model");
const Joi = require("joi");

class CategoryService {
  getAllCategories = async () => {
    try {
      let result = await CategoryModel.find().populate("parent_id");
      return result;
    } catch (except) {
      throw except;
    }
  };
  validateData = async (data) => {
    try {
      let schema = Joi.object({
        name: Joi.string().required().min(3),
        image: Joi.string(),
        slug: Joi.string(),
        status: Joi.string().valid("active", "inactive").default("inactive"),
        parent_id: Joi.string().allow(null, ""),
      });
      let response = schema.validate(data);

      if (response.error) {
        // console.log(response.error.details[0])
        throw response.error.details[0].message;
      }

      return data;
    } catch (except) {
      throw except;
    }
  };

  saveContent = async (data) => {
    try {
      let category = new CategoryModel(data);
      return category.save();
      // return CategoryModel.insertMany
    } catch (except) {
      throw except;
    }
  };
  updateContent = async (data, id) => {
    try {
      return await CategoryModel.findByIdAndUpdate(id, {
        $set: data,
      });
    } catch (except) {
      throw except;
    }
  };
  getCategoryById = async (id) => {
    try {
      let data = await CategoryModel.findOne({
        _id: id,
      }).populate("parent_id");
      if (!data) {
        throw "Resource Not found";
      }
      return data;
    } catch (except) {
      throw except;
    }
  };
  deleteById = async (id) => {
    try {
      let data = await CategoryModel.findOneAndDelete({
        _id: id,
      });
      if (!data) {
        throw "Content already deleted";
      }
      return data;
    } catch (except) {
      throw except;
    }
  };

  getCategoryBySlug = async (slug) => {
    try {
      let result = await CategoryModel.findOne({ slug: slug }).populate(
        "parent_id"
      );
      return result;
    } catch (except) {
      throw except;
    }
  };
}

module.exports = CategoryService;
