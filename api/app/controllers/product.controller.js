const helpers = require("../../config/helpers");
const ProductService = require("../services/product.service");
const slugify = require("slugify");

class ProductController {
  constructor() {
    this.product_svc = new ProductService();
  }

  createProduct = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.files) {
        data.images = req.files.map((item) => item.filename);
      }

      data.slug = slugify(data.title, { lower: true });

      //"","",""  => ["", "", ""]
      if (!data.categories || data.categories === "null") {
        data.categories = null;
      } else {
        data.categories = data.categories.split(",");
      }

      if (!data.brand || data.brand === "null") {
        data.brand = null;
      }

      if (!data.seller || data.seller === "null") {
        data.seller = null;
      }

      await this.product_svc.validateData(data);
      data.actual_price = data.price - (data.price * data.discount) / 100;

      let response = await this.product_svc.saveContent(data);

      if (response) {
        res.json({
          result: data,
          status: true,
          msg: "Product created",
        });
      } else {
        throw "Problem while creating content";
      }
    } catch (exception) {
      console.log("createContent: ", exception);
      next({ status: 422, msg: exception });
    }
  };

  getAllProducts = async (req, res, next) => {
    try {
      let all_products = await this.product_svc.getAllProducts();
      res.json({
        result: all_products,
        status: true,
        msg: "Products fetched",
      });
    } catch (exception) {
      console.log("List Product: ", exception);
      next({ status: 422, msg: exception });
    }
  };

  getProductById = async (req, res, next) => {
    try {
      let productDetail = await this.product_svc.getProductById(req.params.id);
      res.json({
        result: productDetail,
        status: true,
        msg: "Product detail fetched",
      });
    } catch (err) {
      next({ status: 422, msg: err });
    }
  };

  updateProductById = async (req, res, next) => {
    try {
      let data = req.body;
      data.images = [];
      if (req.files) {
        data.images = req.files.map((item) => item.filename);
      }

      if (!data.categories || data.categories === "null") {
        data.categories = null;
      } else {
        data.categories = data.categories.split(",");
      }

      if (!data.brand || data.brand === "null") {
        data.brand = null;
      }

      if (!data.seller || data.seller === "null") {
        data.seller = null;
      }

      let current_product = await this.product_svc.getProductById(
        req.params.id
      );

      data.slug = current_product.slug;

      // to handle delete image
      if (data.del_image) {
        let image_to_delete = data.del_image.split(",");
        current_product.images.map((item) => {
          if (!image_to_delete.includes(item)) {
            data.images.push(item);
          }
        });
      }

      delete data.del_image;

      await this.product_svc.validateData(data);
      data.actual_price = data.price - (data.price * data.discount) / 100;

      let response = await this.product_svc.updateContent(data, req.params.id);

      if (response) {
        res.json({
          result: data,
          status: true,
          msg: "Product updated",
        });
      } else {
        throw "Problem while updating product";
      }
    } catch (exception) {
      console.log("UpdateProduct: ", exception);
      next({ status: 422, msg: exception });
    }
  };

  deleteProductById = async (req, res, next) => {
    try {
      let response = await this.product_svc.deleteById(req.params.id);
      res.json({
        result: response,
        status: true,
        msg: "Product deleted",
      });
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };

  getSearchResult = async (req, res, next) => {
    try {
      let filter = {
        title: { $regex: req.query.keyword, $options: "i" },
      };
      let all_products = await this.product_svc.getSearchResult(filter);
      res.json({
        result: all_products,
        status: true,
        msg: "Products fetched",
      });
    } catch (exception) {
      console.log("List Product: ", exception);
      next({ status: 422, msg: exception });
    }
  };

  getProductBySlug = async (req, res, next) => {
    try {
      let productDetail = await this.product_svc.getAllProducts({
        slug: req.params.slug,
      });
      res.json({
        result: productDetail?.filter((item) => item.slug === req.params.slug),
        status: true,
        msg: "Product detail fetched",
      });
    } catch (err) {
      next({ status: 422, msg: err });
    }
  };
}

module.exports = ProductController;
