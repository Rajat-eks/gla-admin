import type { ISPEAKER } from "../../interface/speaker/speaker.interface";
import { extractErrorMessage } from "../../utils/errorHandler";
import axiosObject from "../axios.config";

export const createSpeaker = async (payload: ISPEAKER) => {
  try {
    const uri: string = `speakers`;
    const response = await axiosObject.post(uri, payload);
    if (response.status == 201) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

export const getSpeakers = async () => {
  try {
    const uri: string = `/speakers/getAllSpeakers`;
    const response = await axiosObject.get(uri);
    if (response.status == 200) {
      return response.data;
      
    }
  } catch (error) {
    return error;
  }
};

export const deleteSpeaker = async (id: string) => {
  try {
    const uri: string = `/speakers/${id}`;
    const response = await axiosObject.delete(uri);
    if (response.status == 200) {
      return response.data;
      
    }
  } catch (error) {
    return error;
  }
};
