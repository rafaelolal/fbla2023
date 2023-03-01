import { KeyedMutator } from "swr";
import { StudentType } from "./students";

export type ParticipantType = {
  pk: number;
  attended: boolean;
  final: boolean;
  event: number;
  student: string;
  studentName: string;
};

type CommonEventType = {
  pk: number;
  title: string;
  startsOn: string;
  finishesOn: string;
  cancellationReason: string;
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
  mutate: KeyedMutator<any>;
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
  type: string;
  startsOn: string;
  location: string;
};
