import axios, { throwResponse } from "../../../config/axios/axios.config";
import { useMutation, UseMutationResult } from "react-query";
import endpoints from "../api.endpoints";
import { IScheduleGetAll, ISchedulePost } from "./schedule-interface";
import { useQuery, UseQueryResult } from "react-query";

const statusSuccess = [200, 201];

export async function createSchedule(params?: ISchedulePost) {
  const res = await axios.post(`${endpoints.schedule.create}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useCreateSchedule = (): UseMutationResult => {
  return useMutation(["create-schedule"], async (params?: any) => {
    const res = await axios.post(`${endpoints.schedule.create}`, params);
    return !statusSuccess.includes(res?.status) ? throwResponse(res) : res.data;
  });
};

export async function getSchedule() {
  const res = await axios.get(`${endpoints.schedule.findAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useGetSchedule = (
  params?: any
): UseQueryResult<Array<IScheduleGetAll>> => {
  return useQuery(["get-schedule", params], async () => {
    const res = await axios.get(`${endpoints.schedule.findAll}`, {
      params: { ...params },
    });
    return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
  });
};

export async function getScheduleById(date?: string) {
  const res = await axios.get(`${endpoints.schedule.select}/${date}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function scheduleDeleteTask(id?: number) {
  const res = await axios.delete(`${endpoints.schedule.delete}/${id}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useScheduleDeleteTaskById = (id?: number): UseMutationResult => {
  return useMutation(["delete-scheduleTask"], async (id?: any) => {
    const res = await axios.delete(`${endpoints.schedule.delete}/${id}`);
    return !statusSuccess.includes(res?.status) ? throwResponse(res) : res.data;
  });
};

export async function updateScheduleById(params?: any, id?: number) {
  const res = await axios.patch(`${endpoints.schedule.update}/${id}`, params);
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
  useCreateSchedule,
  useGetSchedule,
  scheduleDeleteTask,
  updateScheduleById,
  useScheduleDeleteTaskById,
};

export default scheduleAPI;
