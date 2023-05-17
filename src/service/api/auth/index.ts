import axios, { throwResponse } from "../../../config/axios/axios.config";
import endpoints from "../api.endpoints";
import { useQuery, UseQueryResult } from "react-query";
import { IUser } from "../user/user-interface";
import { IProfile } from "../auth/auth-interface";
const statusSuccess = [200, 201];

export async function signin(params?: Partial<IUser>) {
  const res = await axios.post(`${endpoints.auth.signin}`, params);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export async function sigout() {}

export async function getProfile() {
  const res = await axios.get(`${endpoints.auth.getProfile}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const UseGetProfile = (): UseQueryResult<IProfile, Error> => {
  return useQuery([
    "get-profile",
    async () => {
      const res = await axios.get(`${endpoints.auth.getProfile}`);
      return !statusSuccess.includes(res.status)
        ? throwResponse(res)
        : res.data;
    },
  ]);
};

export const authAPI = { signin, sigout, getProfile, UseGetProfile };
export default authAPI;
