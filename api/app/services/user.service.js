const UserModel = require("../model/user.model");
const Joi = require("joi");

class UserService {
  getAllUsers = async (id) => {
    try {
      let result = await UserModel.find({
        _id: { $nin: [id] },
      });
      return result;
    } catch (except) {
      throw except;
    }
  };
  validateData = async (data, isEdit = false) => {
    try {
      let schema;
      if (isEdit) {
        schema = Joi.object({
          name: Joi.string().required().min(3),
          // email: Joi.string().email().required(),
          image: Joi.string(),
          role: Joi.string().valid("admin", "customer", "seller"),
          // password: Joi.string().required().min(8),
          status: Joi.string().valid("active", "inactive").default("inactive"),
        });
      } else {
        schema = Joi.object({
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          image: Joi.string(),
          role: Joi.string().valid("admin", "customer", "seller"),
          password: Joi.string().required().min(8),
          status: Joi.string().valid("active", "inactive").default("inactive"),
        });
      }
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
      let user = new UserModel(data);
      return user.save();
      // return UserModel.insertMany
    } catch (except) {
      throw except;
    }
  };
  updateContent = async (data, id) => {
    try {
      return await UserModel.findByIdAndUpdate(id, {
        $set: data,
      });
    } catch (except) {
      throw except;
    }
  };
  getUserById = async (id) => {
    try {
      let data = await UserModel.findOne({
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
      let data = await UserModel.findOneAndDelete({
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
}

module.exports = UserService;
