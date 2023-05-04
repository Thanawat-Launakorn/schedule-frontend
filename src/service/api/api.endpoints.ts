import { projectConfig } from "../../config/project.config";
export const endpoints = {
  auth: {
    signin: `${projectConfig.baseURL}/authentication/siginin`,
    sigout: `${projectConfig.baseURL}`,
    getProfile: `${projectConfig.baseURL}/authentication/profile`,
  },
  user: {
    create: `${projectConfig.baseURL}/user/create`,
    getAll: `${projectConfig.baseURL}/user/getAll`,
    getOne: `${projectConfig.baseURL}/user/getOne`,
    update: `${projectConfig.baseURL}/user/update`,
    search: `${projectConfig.baseURL}/user/search`,
    selectposition: `${projectConfig.baseURL}/user/query-by-position`,
    delete: `${projectConfig.baseURL}/user/remove`,
  },
};

export default endpoints;
