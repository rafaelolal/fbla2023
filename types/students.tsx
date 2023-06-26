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
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
};

export type ProfileStudentType = {
  id: string;
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
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  biography: string;
};

export type LeaderboardStudentType = {
  email: string;
  image: string;
  firstName: string;
  middleName: string;
  lastName: string;
  rank: number | null;
  points: number;
};
