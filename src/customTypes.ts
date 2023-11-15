import { Timestamp } from "firebase/firestore";

export type Users = {
  name: string;
  id: string;
}[];

export type Points = {
  id: string;
  date: Timestamp;
  description: string;
  score: number;
  user_id: string;
}[];
