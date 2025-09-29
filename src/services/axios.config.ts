import * as axios from "axios";

let axiosObject = axios.default.create();
axiosObject.defaults.baseURL = "https://api.globallegalassociation.org/api/v1/";
// axiosObject.defaults.baseURL = "http://localhost:8080/api/v1/";
axiosObject.defaults.timeout = 12000;
axiosObject.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosObject.interceptors.request.use(
  async function (config: any) {
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

axiosObject.interceptors.response.use(
  async function (config: any) {
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default axiosObject;
