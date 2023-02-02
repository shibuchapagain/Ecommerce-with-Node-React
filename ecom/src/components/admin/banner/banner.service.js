import API_ENDOINTS from "../../../config/api-endpoints.config";
import HttpRequestService from "./../../../services/http-request.service";
class BannerService extends HttpRequestService {
  getAllList = async () => {
    try {
      let data = await this.getRequest(API_ENDOINTS.banner);
      return data;
    } catch (except) {
      throw except;
    }
  };

  getBannerById = async (id) => {
    try {
      let data = await this.getRequest(API_ENDOINTS.banner + "/" + id);
      return data;
      // console.log("details", data);
    } catch (except) {
      throw except;
      // console.log("error", except);
    }
  };

  createBanner = async (data) => {
    try {
      let response = await this.postRequest(API_ENDOINTS.banner, data, {
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
      let del_res = await this.deleteRequest(API_ENDOINTS.banner + "/" + id, {
        strict: true,
      });
      return del_res;
    } catch (except) {
      throw except;
    }
  };

  updateBannerById = async (data, id) => {
    try {
      let response = await this.putRequest(
        API_ENDOINTS.banner + "/" + id,
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

export default BannerService;
