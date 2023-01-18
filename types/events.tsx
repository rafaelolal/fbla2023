import { KeyedMutator } from "swr";
import { StudentType } from "./students";

export type ParticipantType = {
  attended: boolean;
  eventId: number;
  studentId: string;
  studentName: string;
};

export type ParticipantsType = ParticipantType[];

type CommonEventType = {
  id: number;
  title: string;
  start: string;
  isCanceled: string;
  reason: string;
};

export type EventType = CommonEventType & {
  image: string;
  type: string;
  points: number;
  location: string;
  description: string;
};

export type DashboardEventType = CommonEventType & {
  participants: ParticipantsType;
  mutate: KeyedMutator<any>;
};

export type HomeEventType = CommonEventType & {
  image: string;
  type: string;
  points: number;
  location: string;
  description: string;
};

export type ProfileEventType = CommonEventType & {
  end: string;
};

export type StudentsOnEventsType = {
  event: EventType;
  eventId: number;
  student: StudentType;
  studentId: string;
  attended: boolean;
  studentName: string;
};

export type QueryType = {
  type: string;
  start: string;
  location: string;
};
