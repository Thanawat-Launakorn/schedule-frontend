import axios from "axios";
import type { AxiosResponse } from "axios";
import projectConfig from "../project.config";

const instance = axios.create({
  baseURL: projectConfig.baseURL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer `,
  },
  validateStatus: (_) => true,
});

export const instanceBasic = axios.create({
  baseURL: projectConfig.baseURL,
  headers: {
    Accept: "applicatoin/json",
    Authorization: "",
  },
  validateStatus: (_) => true,
});

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
