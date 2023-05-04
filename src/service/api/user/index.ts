import axios, { throwResponse } from "../../../config/axios/axios.config";
import endpoints from "../api.endpoints";
import { IUser } from "./user-interface";
const statusSuccess = [200, 201];

export async function getAllUser() {
  const res = await axios.get(`${endpoints.user.getAll}`);
  !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function getOneUser(id?: number) {
  const res = await axios.get(`${endpoints.user.getOne}/${id}`);
  !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function createUser(params?: IUser) {
  const res = await axios.post(`${endpoints.user.create}`, params);
  !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function updateUser(params?: IUser, id?: number) {
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