import { KeyedMutator } from "swr";

export type EventType = {
  id: string;
  image: string;
  name: string;
  type: string;
  points: number;
  location: string;
  description: string;
  datetime: string;
  isCanceled: boolean;
  reason: string | null;
};

export type EventPropsType = EventType & {
  page: string;
  mutate: KeyedMutator<any>;
};

export type QueryType = {
  type: string | null;
  datetime: string | null;
  location: string | null;
};
