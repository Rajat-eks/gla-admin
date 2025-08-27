import type { IPARTNER } from "../../interface/partner/partner.interafce";
import type { ISPEAKER } from "../../interface/speaker/speaker.interface";
import { extractErrorMessage } from "../../utils/errorHandler";
import axiosObject from "../axios.config";

export const createPartner = async (payload: IPARTNER) => {
  try {
    const uri: string = `partner`;
    const response = await axiosObject.post(uri, payload);
    if (response.status == 201) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

export const getPartner = async () => {
  try {
    const uri: string = `/partner/getAll`;
    const response = await axiosObject.get(uri);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const deletePartner = async (id: string) => {
  try {
    const uri: string = `/partner/${id}`;
    const response = await axiosObject.delete(uri);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
