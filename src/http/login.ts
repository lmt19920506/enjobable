import request from "./request";
import axios from "axios";
export const loginApi = (file: any) => {
  const data = {
    username: "admin",
    password: "JFat0Zdc",
    grant_type: "password",
    scope: "server",
  };
  const { username, password, grant_type, scope } = data;
  axios.post("/test/auth/oauth2/token", data, {
    params: { username,password, grant_type, scope },
    withCredentials: true,
    headers: {
      Authorization: "Basic dGVzdDp0ZXN0",
      "TENANT-ID": 1,
    },
  });
};
