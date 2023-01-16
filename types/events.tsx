import { KeyedMutator } from "swr";

export type ParticipantType = {
  attended: boolean;
  eventId: number;
  studentId: string;
};

export type ParticipantsType = ParticipantType[];

type CommonEventType = {
  id: number;
  name: string;
  datetime: string;
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

export type DashBoardEventPropsType = CommonEventType & {
  participants: ParticipantsType;
  mutate: KeyedMutator<any>;
};

export type HomeEventPropsType = CommonEventType & {};

export type QueryType = {
  type: string;
  datetime: string;
  location: string;
};
