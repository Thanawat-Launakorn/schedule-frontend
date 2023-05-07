import axios from "axios";
import type { AxiosResponse } from "axios";
import projectConfig from "../project.config";
import { getToken } from "../../provider/auth/Auth.Provider";

const instance = axios.create();

export const instanceBasic = axios.create({
  baseURL: projectConfig.baseURL,
  headers: {
    Accept: "applicatoin/json",
    Authorization: "",
  },
  validateStatus: (_) => true,
});

instance.interceptors.request.use(
  (request) => {
    const token = getToken();
    request.baseURL = `${projectConfig.baseURL}`;
    request.headers["Authorization"] = `Bearer ${token}`;
    request.headers["Accept"] = `application/json`;
    request.validateStatus = (_) => true;
    return Promise.resolve(request);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const throwResponse = (res: AxiosResponse) => {
  const { message } = res.data?.result;
  if (!Array.isArray(message)) {
    throw new Error(message);
  }
  const text = message.reduce((result: string, item: string) => {
    return `${result}${item}\n`;
  }, "");
  throw new Error(text);
};
export default instance;
