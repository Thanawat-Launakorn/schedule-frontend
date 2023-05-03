import { projectConfig } from "../../config/project.config";
export const endpoints = {
  auth: {
    signin: `${projectConfig.baseURL}/authentication/siginin`,
    sigout: `${projectConfig.baseURL}`,
    getProfile: `${projectConfig.baseURL}/authentication/profile`,
  },
};

export default endpoints;
