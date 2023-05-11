import axios, { throwResponse } from "../../../config/axios/axios.config";

import endpoints from "../api.endpoints";
import { ISchedulePost } from "./schedule-interface";

const statusSuccess = [200, 201];

export async function createSchedule(params?: ISchedulePost) {
  const res = await axios.post(`${endpoints.schedule.create}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getSchedule() {
  const res = await axios.get(`${endpoints.schedule.findAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getScheduleById(date?: string) {
  const res = await axios.get(`${endpoints.schedule.select}${date}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function exportExcelSchedule() {
  const res = await axios.post(
    `${endpoints.excel.schedule}`,
    {},
    { responseType: "blob" }
  );
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const scheduleAPI = {
  createSchedule,
  getSchedule,
  getScheduleById,
  exportExcelSchedule,
};

export default scheduleAPI;
