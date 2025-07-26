import { PrizeRedemptionType, PrizeType } from "./prize";
import { ProfileEventType } from "./event";

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
  currentPoints: number;
  balance: number;
  rank: number | null;
  biography: string;
  image: string;
  redemptions: PrizeRedemptionType[];
  events: { attended: boolean; event: ProfileEventType }[];
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
  currentPoints: number;
};
