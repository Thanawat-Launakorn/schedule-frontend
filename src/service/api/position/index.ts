import axios, { throwResponse } from "../../../config/axios/axios.config";
import endpoints from "../api.endpoints";

const statusSuccess = [200, 201];

export async function getAllPosition() {
  const res = await axios.get(`${endpoints.position.getAll}`);
  return !statusSuccess.includes(res.status) ? throwResponse(res) : res.data;
}

export const positionAPI = {
  getAllPosition,
};

export default positionAPI;
