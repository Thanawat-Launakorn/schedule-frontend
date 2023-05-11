import { useQuery, UseQueryResult } from "react-query";
import axios, { throwResponse } from "../../../config/axios/axios.config";
import projectConfig from "../../../config/project.config";
import endpoints from "../api.endpoints";
import { IUser, IUserPost, IUserSearch } from "./user-interface";
const statusSuccess = [200, 201];

export async function getAllUser(params?: IUserSearch) {
  const res = await axios.get(`${endpoints.user.getAll}${params?.name}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useGetAllUser = (
  params?: IUser
): UseQueryResult<Array<IUser>, Error> => {
  console.log("params", params);

  return useQuery(["get-all-user", params], async () => {
    const res = await axios.get(`${endpoints.user.getAll}`, {
      params: { ...params },
    });
    if (!statusSuccess.includes(res.status)) {
      throwResponse(res);
    }
    return res.data;
  });
};

export async function getOneUser(id?: number) {
  const res = await axios.get(`${endpoints.user.getOne}/${id}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useGetUserByID = (
  id?: number
): UseQueryResult<IUserPost, Error> => {
  return useQuery(
    ["get-user-by-id", id],
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

export async function createUser(params?: Omit<IUserPost, "id">) {
  const res = await axios.post(`${endpoints.user.create}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function updateUser(params?: Omit<IUser, "id">, id?: number) {
  const res = await axios.patch(`${endpoints.user.update}/${id}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function deleteUser(id?: number) {
  const res = await axios.delete(`${endpoints.user.delete}/${id}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function searchUser(name?: IUser) {
  const res = await axios.get(`${endpoints.user.search}${name}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function selectPosition(id?: number) {
  const res = await axios.post(`${endpoints.user.selectposition}/${id}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const userAPI = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  selectPosition,
  useGetAllUser,
  useGetUserByID,
};
export default userAPI;
