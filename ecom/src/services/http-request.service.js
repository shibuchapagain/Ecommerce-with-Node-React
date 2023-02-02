import axiosInstance from "./axios.service";

class HttpRequestService {
  postRequest = async (url, data, config = null) => {
    try {
      let header = {};
      if (config?.strict) {
        let token = localStorage.getItem("_mern14_token") ?? null; // null OR or
        header = {
          headers: {
            authorization: "Bearer " + token,
          },
        };
      }
      if (config?.file) {
        header = {
          headers: {
            ...header.headers,
            "content-type": "multipart/form-data",
          },
        };
      }
      let response = await axiosInstance.post(url, data, header);
      return response;
    } catch (err) {
      throw err;
    }
  };

  getRequest = async (url, config = null) => {
    try {
      let header = {};
      if (config?.strict) {
        let token = localStorage.getItem("_mern14_token") ?? null; // null OR or
        header = {
          headers: {
            authorization: "Bearer " + token,
          },
        };
      }
      let response = await axiosInstance.get(url, header);
      return response;
    } catch (err) {
      throw err;
    }
  };

  deleteRequest = async (url, config = null) => {
    try {
      let header = {};
      if (config?.strict) {
        let token = localStorage.getItem("_mern14_token") ?? null; // null OR or
        header = {
          headers: {
            authorization: "Bearer " + token,
          },
        };
      }
      let response = await axiosInstance.delete(url, header);
      return response;
    } catch (err) {
      throw err;
    }
  };

  putRequest = async (url, data, config = null) => {
    try {
      let header = {};
      if (config?.strict) {
        let token = localStorage.getItem("_mern14_token") ?? null; // null OR or
        header = {
          headers: {
            authorization: "Bearer " + token,
          },
        };
      }
      if (config?.file) {
        header = {
          headers: {
            ...header.headers,
            "content-type": "multipart/form-data",
          },
        };
      }
      let response = await axiosInstance.put(url, data, header);
      return response;
    } catch (err) {
      throw err;
    }
  };
}

export default HttpRequestService;
