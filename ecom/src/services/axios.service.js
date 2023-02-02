import axios from "axios";
import { toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  timeoutErrorMessage: "Server timed out...",
  headers: {
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    // fullfill
    // console.log("success", response, "line 14");
    return response.data;
  },
  (reject) => {
    // err
    // console.log("error", reject, "line 18");
    if (reject.response.status === 401) {
      localStorage.removeItem("_mern14_token");
      localStorage.removeItem("_mern14_user");
      window.location.href = "/login";
    } else if (reject.response.status === 403) {
      toast.warning("You do not have previleage to access this");
      window.location.href = "/";
    } else if (reject.response.status === 404) {
      toast.warning("endpoint does not exists");
    } else {
      throw reject.response.data;
    }
  }
);

export default axiosInstance;
