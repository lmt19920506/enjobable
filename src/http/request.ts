import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router/index.js";
import Cookies from "js-cookie";

/**
 * @description  本套配置只适用于jwtoken 额外操作请自行配置
 */
const http = axios.create({
  // baseURL: import.meta.env.VITE_APP_API_URL || "/web/api",
  // baseURL: 'http://43.138.226.142:9095',
  baseURL: "/api/",
});

//过滤器
http.interceptors.request.use(function (config) {
  const token = Cookies.get("token");
  let str = token;
  config.headers["Authorization"] = `Bearer ${str}`;
  return config;
}),
  function (err: any) {
    return Promise.reject(err);
  };

//请求拦截器
http.interceptors.response.use(
  (res) => {
    // console.log("axios---", res);
    if (res.data.code === 401 || res.data.code === 400) {
      //登录状态已过期.处理路由重定向
      localStorage.removeItem("token");
      // router.push("/login");
    }
    return res.data;
  },
  (err) => {
    console.log("err---", err);
    if (err.response && err.response.data) {
      ElMessage({
        showClose: true,
        message: err.response.data,
        type: "error",
      });
      // 接口鉴权出错 跳至登录页
      if (err.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        // router.replace("/login");
      }
    }

    return Promise.reject(err);
  }
);

export default http;
