const CategoryService = require("../services/category.service");
const ProductService = require("./../services/product.service");
const slugify = require("slugify");

class CategoryController {
  constructor() {
    this.category_svc = new CategoryService();
    this.prduct_svc = new ProductService();
  }
  getAllLists = async (req, res, next) => {
    try {
      console.log("i am here");
      let result = await this.category_svc.getAllCategories();
      res.json({
        retult: result,
        status: true,
        msg: "Category fetched",
      });
    } catch (exception) {
      console.log("geAllList: ", exception);
      next({ status: 422, msg: exception });
    }
  };
  createContent = async (req, res, next) => {
    try {
      let data = req.body;

      if (req.file) {
        data.image = req.file.filename;
      }

      data.slug = slugify(data.name, { lower: true });

      // data.parent_id => "null"
      //
      if (!data.parent_id || data.parent_id === "null") {
        data.parent_id = null;
      }

      await this.category_svc.validateData(data);
      let response = await this.category_svc.saveContent(data);

      if (response) {
        res.json({
          result: data,
          status: true,
          msg: "Category created",
        });
      } else {
        throw "Problem while creating content";
      }
    } catch (exception) {
      console.log("createContent: ", exception);
      next({ status: 422, msg: exception });
    }
  };
  updateContent = async (req, res, next) => {
    try {
      let data = req.body;
      let category = await this.category_svc.getCategoryById(req.params.id);

      if (req.file) {
        data.image = req.file.filename;
      } else {
        data.image = category.image;
      }
      if (!data.parent_id || data.parent_id === "null") {
        data.parent_id = null;
      }
      await this.category_svc.validateData(data);

      let response = await this.category_svc.updateContent(data, req.params.id);

      if (response) {
        res.json({
          result: data,
          status: true,
          msg: "Category updated",
        });
      } else {
        throw "Problem while updating content";
      }
    } catch (exception) {
      console.log("updateContent: ", exception);
      next({ status: 422, msg: exception });
    }
  };
  getById = async (req, res, next) => {
    try {
      let data = await this.category_svc.getCategoryById(req.params.id);
      res.json({
        result: data,
        status: true,
        msg: "Resource fetched.",
      });
    } catch (except) {
      next({ status: 422, msg: except });
    }
  };
  deleteById = async (req, res, next) => {
    try {
      let response = await this.category_svc.deleteById(req.params.id);
      res.json({
        result: response,
        msg: "Content deleted successfully",
        status: true,
      });
    } catch (exception) {
      next({ status: 422, msg: exception });
    }
  };

  getAllProductsByCatSlug = async (req, res, next) => {
    try {
      let data = await this.category_svc.getCategoryBySlug(req.params.slug);
      let products = await this.product_svc.getProductByCategoryId(data._id);
      res.json({
        result: {
          category: data,
          products: products,
        },
        status: true,
        msg: "Resource fetched.",
      });
    } catch (except) {
      next({ status: 422, msg: except });
    }
  };
}

module.exports = CategoryController;
