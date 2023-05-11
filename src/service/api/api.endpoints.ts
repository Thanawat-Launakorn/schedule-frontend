import { projectConfig } from "../../config/project.config";
export const endpoints = {
  auth: {
    signin: `${projectConfig.baseURL}/authentication/siginin`,
    sigout: `${projectConfig.baseURL}`,
    getProfile: `${projectConfig.baseURL}/authentication/profile`,
  },
  user: {
    create: `${projectConfig.baseURL}/user/create`,
    getAll: `${projectConfig.baseURL}/user/getAll?name=`,
    getOne: `${projectConfig.baseURL}/user/getOne`,
    update: `${projectConfig.baseURL}/user/update`,
    updatepassword: `${projectConfig.baseURL}/user/update-password`,
    search: `${projectConfig.baseURL}/user/search?name=`,
    selectposition: `${projectConfig.baseURL}/user/query-by-position`,
    delete: `${projectConfig.baseURL}/user/remove`,
  },
  position: {
    getAll: `${projectConfig.baseURL}/position/findAll`,
  },
  schedule: {
    create: `${projectConfig.baseURL}/schedule/create`,
    random: `${projectConfig.baseURL}/schedule/random`,
    findAll: `${projectConfig.baseURL}/schedule/findAll`,
    select: `${projectConfig.baseURL}/schedule/select?date=`,
    sumpy: `${projectConfig.baseURL}/schedule/sumpy`,
    payoften: `${projectConfig.baseURL}/schedule/payoften`,
    update: `${projectConfig.baseURL}/schedule/update`,
    delete: `${projectConfig.baseURL}/schedule/delete-task`,
  },
  excel: {
    user: `${projectConfig.baseURL}/excel/user`,
    schedule: `${projectConfig.baseURL}/excel/schedule`,
  },
};

export default endpoints;
