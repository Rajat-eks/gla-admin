import type { 

  ICreateAgendaSession, 
  IUpdateAgendaSession 
} from "../../interface/agenda/agenda.interface";
import { extractErrorMessage } from "../../utils/errorHandler";
import axiosObject from "../axios.config";

// Get all agenda sessions for an event
export const getAgendaSessions = async (eventId: string) => {
  try {
    const uri: string = `/agenda/event/${eventId}`;
    const response = await axiosObject.get(uri);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

// Get all agenda sessions
export const getAllAgendaSessions = async () => {
  try {
    const uri: string = `/agenda/sessions`;
    const response = await axiosObject.get(uri);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

// Create a new agenda session
export const createAgendaSession = async (payload: ICreateAgendaSession) => {
  try {
    const uri: string = `/agenda/sessions`;
    const response = await axiosObject.post(uri, payload);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

// Update an agenda session
export const updateAgendaSession = async (payload: IUpdateAgendaSession) => {
  try {
    const uri: string = `/agenda/sessions/${payload.id}`;
    const response = await axiosObject.put(uri, payload);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

// Delete an agenda session
export const deleteAgendaSession = async (id: string) => {
  try {
    const uri: string = `/agenda/sessions/${id}`;
    const response = await axiosObject.delete(uri);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

// Get a specific agenda session by ID
export const getAgendaSessionById = async (id: string) => {
  try {
    const uri: string = `/agenda/sessions/${id}`;
    const response = await axiosObject.get(uri);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

// Get complete agenda for an event (with all sessions and speakers)
export const getEventAgenda = async (eventId: string) => {
  try {
    const uri: string = `/agenda/event/${eventId}/complete`;
    const response = await axiosObject.get(uri);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};
