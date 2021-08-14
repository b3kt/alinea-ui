import { boot } from "quasar/wrappers";

import { $axios } from "@baloise/vue-axios";
import { getToken } from "@baloise/vue-keycloak";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://api.example.com' })
const axiosApiInstance = $axios.create();
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const axiosUploadInstance = $axios.create({
  baseURL: 'https://alinea-imgs.herokuapp.com/imgs',
});
// axiosUploadInstance.interceptors.request.use(
//   async (config) => {
//     const token = await getToken();
//     config.headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );



export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axiosApiInstance;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axiosApiInstance, axiosUploadInstance };
