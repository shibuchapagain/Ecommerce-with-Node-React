import API_ENDOINTS from "../../../config/api-endpoints.config";
import HttpRequestService from "../../../services/http-request.service";
class ProductService extends HttpRequestService {
  getAllList = async () => {
    try {
      let data = await this.getRequest(API_ENDOINTS.product);
      return data;
    } catch (except) {
      throw except;
    }
  };

  getProductById = async (id) => {
    try {
      let data = await this.getRequest(API_ENDOINTS.product + "/" + id);
      return data;
      // console.log("details", data);
    } catch (except) {
      throw except;
      // console.log("error", except);
    }
  };

  createProduct = async (data) => {
    try {
      let response = await this.postRequest(API_ENDOINTS.product, data, {
        strict: true,
        file: true,
      });
      return response;
    } catch (except) {
      throw except;
    }
  };

  deleteData = async (id) => {
    try {
      let del_res = await this.deleteRequest(API_ENDOINTS.product + "/" + id, {
        strict: true,
      });
      return del_res;
    } catch (except) {
      throw except;
    }
  };

  updateProductById = async (data, id) => {
    try {
      let response = await this.putRequest(
        API_ENDOINTS.product + "/" + id,
        data,
        {
          strict: true,
          file: true,
        }
      );
      return response;
    } catch (except) {
      throw except;
    }
  };

  listSearchData = async (keyword) => {
    try {
      let response = await this.getRequest(
        "/product/search?keyword=" + keyword
      );
      console.log(response);
      return response;
    } catch (err) {
      throw err;
    }
  };
}

export const product_svc = new ProductService();

export default ProductService;
