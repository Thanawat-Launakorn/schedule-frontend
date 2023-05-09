import { useQuery, UseQueryResult } from "react-query";
import axios, { throwResponse } from "../../../config/axios/axios.config";
import endpoints from "../api.endpoints";

const statusSuccess = [200, 201];

export async function getAllPosition() {
  const res = await axios.get(`${endpoints.position.getAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const useGetAllPosition = (): UseQueryResult<IPosition, Error> => {
  return useQuery(["get-all-position"], async () => {
    const res = await axios.get(`${endpoints.position.getAll}`);
    if (!statusSuccess.includes(res.status)) {
      throwResponse(res);
    }
    return res.data;
  });
};

export const positionAPI = {
  getAllPosition,
  useGetAllPosition,
};

export default positionAPI;
