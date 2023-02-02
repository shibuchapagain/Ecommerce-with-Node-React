import API_ENDOINTS from "../config/api-endpoints.config";
import HttpRequestService from "./http-request.service";

class AuthService extends HttpRequestService {
  login = async (data) => {
    try {
      let user_data = await this.postRequest(API_ENDOINTS.login, data);

      let json_string = JSON.stringify({
        name: user_data.result.deatil.name,
        email: user_data.result.deatil.email,
        role: user_data.result.deatil.role,
        id: user_data.result.deatil._id,
      });

      // store in redux store

      localStorage.setItem("_mern14_token", user_data.result.token);
      localStorage.setItem("_mern14_user", json_string);
      return {
        name: user_data.result.deatil.name,
        email: user_data.result.deatil.email,
        role: user_data.result.deatil.role,
        id: user_data.result.deatil._id,
      };
    } catch (err) {
      throw err;
    }
  };

  getMyProfile = async () => {
    try {
      let user = await this.getRequest(API_ENDOINTS.me, { strict: true });
      if (user) {
        return user;
      } else {
        throw user;
      }
    } catch (except) {
      throw except;
    }
  };
}

export default AuthService;
