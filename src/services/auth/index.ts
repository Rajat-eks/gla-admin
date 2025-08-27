import { extractErrorMessage } from "../../utils/errorHandler";
import axiosObject from "../axios.config";

export const userLogin = async (email: string, password: string) => {
  try {
    const uri: string = `auth/sign-in`;
    const response = await axiosObject.post(uri, { email, password });
    if (response.status == 200 || 201) {
      return response.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error: any) {
    const message = extractErrorMessage(error);

    // Re-throw a new error with just the message
    throw new Error(message);
  }
};
