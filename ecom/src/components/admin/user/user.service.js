import API_ENDOINTS from "../../../config/api-endpoints.config";
import HttpRequestService from "../../../services/http-request.service";
class UserService extends HttpRequestService {
  getAllList = async () => {
    try {
      let data = await this.getRequest(API_ENDOINTS.user, { strict: true });
      return data;
    } catch (except) {
      throw except;
    }
  };

  getAllSeller = async () => {
    try {
      let data = await this.getRequest(API_ENDOINTS.user, { strict: true });
      let seller = data?.retult?.filter((item) => item.role === "seller");
      return seller;
    } catch (except) {
      throw except;
    }
  };

  getUserById = async (id) => {
    try {
      let data = await this.getRequest(API_ENDOINTS.user + "/" + id, {
        strict: true,
      });
      return data;
      // console.log("details", data);
    } catch (except) {
      throw except;
      // console.log("error", except);
    }
  };

  createUser = async (data) => {
    try {
      let response = await this.postRequest(API_ENDOINTS.user, data, {
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
      let del_res = await this.deleteRequest(API_ENDOINTS.user + "/" + id, {
        strict: true,
      });
      return del_res;
    } catch (except) {
      throw except;
    }
  };

  updateUserById = async (data, id) => {
    try {
      let response = await this.putRequest(API_ENDOINTS.user + "/" + id, data, {
        strict: true,
        file: true,
      });
      return response;
    } catch (except) {
      throw except;
    }
  };
}

export const user_svc = new UserService();

export default UserService;
