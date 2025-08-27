import type { IEvent } from "../../interface/event/event.interface";
import { extractErrorMessage } from "../../utils/errorHandler";
import axiosObject from "../axios.config";

export const createEvent = async (event: IEvent) => {
  try {
    const uri: string = `events`;
    const response = await axiosObject.post(uri, event);
    if (response.status == 201) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

export const getEvent = async () => {
  try {
    const uri: string = `events`;
    const response = await axiosObject.get(uri);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};
