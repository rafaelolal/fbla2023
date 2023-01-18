import { AwardType } from "./awards";
import { StudentsOnEventsType } from "./events";

type CommonStudentType = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
};

export type DashboardStudentType = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  points: number;
  rank: number | null;
};

export type ProfileStudentType = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  points: number;
  rank: number | null;
  bio: string;
  image: string;
  awards: AwardType[];
  events: StudentsOnEventsType[];
};

export type ProfileModalStudentType = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  bio: string;
};

export type StudentType = {
  points: number;
  rank: number | null;
  image: string;
  awards: AwardType[];
};
