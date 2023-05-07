import { useQuery, UseQueryResult } from "react-query";
import axios, { throwResponse } from "../../../config/axios/axios.config";
import projectConfig from "../../../config/project.config";
import endpoints from "../api.endpoints";
import { IUser } from "./user-interface";
const statusSuccess = [200, 201];

export async function getAllUser() {
  const res = await axios.get(`${endpoints.user.getAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getOneUser(id?: number) {
  const res = await axios.get(`${endpoints.user.getOne}/${id}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useGetUserByID = (id?: number): UseQueryResult<IUser, Error> => {
  return useQuery(
    ["get-donate-by-id", id],
    async () => {
      const res = await axios.get(`${endpoints.user.getOne}/${id}`);
      if (!statusSuccess.includes(res.status)) {
        throwResponse(res);
      }
      return res.data;
    },
    { enabled: !!id }
  );
};

export async function createUser(params?: Omit<IUser, "id">) {
  const res = await axios.post(`${endpoints.user.create}`, params);
  !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function updateUser(params?: Omit<IUser, "id">, id?: number) {
  const res = await axios.patch(`${endpoints.user.update}/${id}`, params);
  !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function deleteUser(id?: number) {
  const res = await axios.delete(`${endpoints.user.delete}/${id}`);
  !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function searchUser(name?: IUser) {
  const res = await axios.get(`${endpoints.user.search}/${name}`);
  !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function selectPosition(id?: number) {
  const res = await axios.post(`${endpoints.user.selectposition}/${id}`);
  !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const userAPI = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  selectPosition,
};
export default userAPI;
