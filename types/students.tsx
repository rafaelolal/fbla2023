import { AwardType } from "./awards";
import { ProfileEventType } from "./events";

type CommonStudentType = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
};

export type DashboardStudentType = {
  pk: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
};

export type ProfileStudentType = {
  pk: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  points: number;
  rank: number | null;
  biography: string;
  image: string;
  awards: AwardType[];
  events: { attended: boolean; event: ProfileEventType }[];
  prizes: string[];
};

export type ProfileModalStudentType = {
  pk: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  biography: string;
};

export type LeaderboardStudentType = {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  rank: number | null;
  points: number;
};
