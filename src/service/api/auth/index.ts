import axios, { throwResponse } from "../../../config/axios/axios.config";
import { ISignin } from "./auth-interface";
import endpoints from "../api.endpoints";

const statusSuccess = [200, 201];

export async function signin(params?: ISignin) {
  const res = await axios.post(`${endpoints.auth.signin}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function sigout() {}

export async function getProfile() {
  const res = await axios.get(`${endpoints.auth.getProfile}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const authAPI = { signin, sigout, getProfile };
export default authAPI;
