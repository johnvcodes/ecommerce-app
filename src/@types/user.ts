import { Timestamp } from "firebase/firestore";

export type TUser = {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  createdAt: Timestamp;
};

export type TUserCredentials = Pick<TUser, "displayName" | "email"> & {
  password: string;
};
