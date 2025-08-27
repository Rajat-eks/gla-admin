import { extractErrorMessage } from "../../utils/errorHandler";
import axiosObject from "../axios.config";

export const uploadFile = async (file: File) => {
  try {
    const uri = `upload`;

    // Prepare FormData
    const formData = new FormData();
    formData.append("file", file); // "file" should match what your backend expects

    const response = await axiosObject.post(uri, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};
