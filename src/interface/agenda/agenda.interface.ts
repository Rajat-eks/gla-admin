export interface IAgendaSpeaker {
  id?: string;
  name: string;
  designation: string;
  company?: string;
  country?: string;
  avatar: string;
  linkedin?: string;
}

export interface IAgendaSession {
  id?: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  speakers: IAgendaSpeaker[];
  eventId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAgenda {
  id?: string;
  eventId: string;
  eventName: string;
  sessions: IAgendaSession[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateAgendaSession {
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  speakerIds: string[];
  eventId: string;
  titleColor?: string;
}

export interface IUpdateAgendaSession {
  id: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  speakerIds?: string[];
}
