export const extractErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    // Case: message is string or array (NestJS uses both)
    const message = error.response.data.message;
    return Array.isArray(message) ? message.join(", ") : message;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  if (error?.message) {
    return error.message;
  }

  return "An unknown error occurred";
};
