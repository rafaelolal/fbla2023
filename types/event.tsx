import { KeyedMutator } from "swr";

export type ParticipantType = {
  id: number;
  attended: boolean;
  final: boolean;
  event: number;
  student: string;
  studentName: string;
};

type CommonEventType = {
  id: number;
  title: string;
  startsOn: string;
  finishesOn: string;
  cancelationReason: string;
};

export type EventType = CommonEventType & {
  image: string;
  type: string;
  points: number;
  location: string;
  description: string;
};

export type DashboardEventType = CommonEventType & {
  participants: ParticipantType[];
};

export type HomeEventType = CommonEventType & {
  image: string;
  type: string;
  points: number;
  location: string;
  description: string;
};

export type ProfileEventType = CommonEventType;

export type QueryType = {
  search: string;
  type: string;
  location: string;
  points: string;
  startDate: string;
  startTime: string;
  duration: string;
};
