const ProductModel = require("../model/product.model");
const Joi = require("joi");

class ProductService {
  getAllProducts = async () => {
    try {
      let result = await ProductModel.find()
        .populate("categories")
        .populate("brand")
        .populate("seller");
      return result;
    } catch (except) {
      throw except;
    }
  };
  validateData = async (data) => {
    try {
      let schema = Joi.object({
        title: Joi.string().required().min(3),
        images: Joi.array(),
        slug: Joi.string(),
        status: Joi.string().valid("active", "inactive").default("inactive"),
        categories: Joi.array().required(),
        brand: Joi.string(),
        price: Joi.number().required(),
        discount: Joi.number().default(0),
        description: Joi.string(),
        seller: Joi.string().empty(null, ""),
        sku: Joi.string().empty(null, ""),
        stock: Joi.number().empty(null, 0),
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
      let product = new ProductModel(data);
      return product.save();
      // return ProductModel.insertMany
    } catch (except) {
      throw except;
    }
  };
  updateContent = async (data, id) => {
    try {
      return await ProductModel.findByIdAndUpdate(id, {
        $set: data,
      });
    } catch (except) {
      throw except;
    }
  };
  getProductById = async (id) => {
    try {
      let data = await ProductModel.findOne({
        _id: id,
      })
        .populate("categories")
        .populate("brand")
        .populate("seller");
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
      let data = await ProductModel.findOneAndDelete({
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

  getSearchResult = async (filter = {}) => {
    try {
      let result = await ProductModel.find(filter)
        .populate("categories")
        .populate("brand")
        .populate("seller");
      return result;
    } catch (except) {
      throw except;
    }
  };

  getProductByCategoryId = async (catId) => {
    try {
      let result = await ProductModel.find({
        categories: { $in: [catId] },
      })
        .populate("categories")
        .populate("brand")
        .populate("seller");
      return result;
    } catch (except) {
      throw except;
    }
  };
}

module.exports = ProductService;
