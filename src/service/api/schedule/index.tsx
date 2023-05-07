import axios, { throwResponse } from "../../../config/axios/axios.config";

import endpoints from "../api.endpoints";
import { ISchedulePost } from "./schedule-interface";

const statusSuccess = [200, 201];

export async function createSchedule(params?: Omit<ISchedulePost, "id">) {
  const res = await axios.post(`${endpoints.user.create}`, params);
  !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const scheduleAPI = {
  createSchedule,
};

export default scheduleAPI;
