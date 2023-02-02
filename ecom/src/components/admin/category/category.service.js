import API_ENDOINTS from "../../../config/api-endpoints.config";
import HttpRequestService from "../../../services/http-request.service";
class CategoryService extends HttpRequestService {
  getAllList = async () => {
    try {
      let data = await this.getRequest(API_ENDOINTS.category);
      return data;
    } catch (except) {
      throw except;
    }
  };

  getCategoryById = async (id) => {
    try {
      let data = await this.getRequest(API_ENDOINTS.category + "/" + id);
      return data;
      // console.log("details", data);
    } catch (except) {
      throw except;
      // console.log("error", except);
    }
  };

  createCategory = async (data) => {
    try {
      let response = await this.postRequest(API_ENDOINTS.category, data, {
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
      let del_res = await this.deleteRequest(API_ENDOINTS.category + "/" + id, {
        strict: true,
      });
      return del_res;
    } catch (except) {
      throw except;
    }
  };

  updateCategoryById = async (data, id) => {
    try {
      let response = await this.putRequest(
        API_ENDOINTS.category + "/" + id,
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

  getCategoryDetailBySlug = async (slug) => {
    try {
      let data = await this.getRequest(
        API_ENDOINTS.category + "/list-products/" + slug
      );
      return data;
    } catch (except) {
      throw except;
    }
  };
}

export const category_svc = new CategoryService();

export default CategoryService;
