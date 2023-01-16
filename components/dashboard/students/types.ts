import { KeyedMutator } from "swr";

export type StudentType = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  points: number;
  rank: number;
};

export type StudentPropsType = StudentType & {
  mutate: KeyedMutator<any>;
};