import axios from "axios";
import { getToken, removeToken } from "@/helpers/authHelpers";

const env = import.meta.env.VITE_REACT_APP_NODE_ENV;

const recordsApi = axios.create({
  baseURL:
    env === "production"
      ? `${import.meta.env.VITE_REACT_APP_NODE_ENV}`
      : env === "development"
      ? `${import.meta.env.VITE_REACT_APP_NOMDEK_ADMIN_URL}`
      : "",
  headers: {
    Accept: "application/json",
  },
});

recordsApi.interceptors.request.use(
  (config) => {
    const authToken = getToken()?.auth;
    const workspaceToken = getToken()?.workspace;

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    if (workspaceToken) {
      config.headers["workspace"] = `${workspaceToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

recordsApi.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error.response) {
      if ([401].includes(error.response.status)) {
        window.location.replace("/auth/login");
        removeToken("token");
      }
    }
    return Promise.reject(error);
  },
);

export default recordsApi;
