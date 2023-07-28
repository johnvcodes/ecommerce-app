import { Timestamp } from "firebase/firestore";

export type TSize = {
  uid: string;
  type: string;
  value: string;
  label: string;
  createdAt: Timestamp;
};
