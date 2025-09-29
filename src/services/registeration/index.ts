import type { IREGISTERATION } from "../../components/modal/AddRegisteration";
import { extractErrorMessage } from "../../utils/errorHandler";
import axiosObject from "../axios.config";

export const createRegisteration = async (payload: any) => {
  try {
    const uri: string = `registeration`;
    const response = await axiosObject.post(uri, payload);
    if (response.status == 201) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

export const getRegisteration = async () => {
  try {
    const uri: string = `registeration`;
    const response = await axiosObject.get(uri);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};
