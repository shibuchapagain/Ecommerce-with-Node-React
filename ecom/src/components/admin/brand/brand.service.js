import API_ENDOINTS from "../../../config/api-endpoints.config";
import HttpRequestService from "../../../services/http-request.service";
class BrandService extends HttpRequestService {
  getAllList = async () => {
    try {
      let data = await this.getRequest(API_ENDOINTS.brand);
      return data;
    } catch (except) {
      throw except;
    }
  };

  getBrandById = async (id) => {
    try {
      let data = await this.getRequest(API_ENDOINTS.brand + "/" + id);
      return data;
      // console.log("details", data);
    } catch (except) {
      throw except;
      // console.log("error", except);
    }
  };

  createBrand = async (data) => {
    try {
      let response = await this.postRequest(API_ENDOINTS.brand, data, {
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
      let del_res = await this.deleteRequest(API_ENDOINTS.brand + "/" + id, {
        strict: true,
      });
      return del_res;
    } catch (except) {
      throw except;
    }
  };

  updateBrandById = async (data, id) => {
    try {
      let response = await this.putRequest(
        API_ENDOINTS.brand + "/" + id,
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
}

export const brand_svc = new BrandService();

export default BrandService;
