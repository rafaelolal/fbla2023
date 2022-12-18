export type EventType = {
  id: string;
  image: string;
  name: string;
  type: string;
  points: number;
  location: string;
  description: string;
  datetime: string;
};

export type EventPropType = EventType & { page: string };

export type QueryType = {
  type: string | null;
  datetime: string | null;
  location: string | null;
};
