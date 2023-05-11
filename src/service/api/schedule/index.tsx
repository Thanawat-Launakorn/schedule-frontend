import axios, { throwResponse } from "../../../config/axios/axios.config";
import { useMutation, UseMutationResult } from "react-query";
import endpoints from "../api.endpoints";
import { ISchedulePost } from "./schedule-interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

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

export const useGetSchedule = (params?: any): UseQueryResult<any> => {
  return useQuery(["get-schedule", params], async () => {
    const res = await axios.get(`${endpoints.schedule.findAll}`, {
      params: { ...params },
    });
    return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
  });
};

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
  useCreateSchedule,
  useGetSchedule,
};

export default scheduleAPI;
