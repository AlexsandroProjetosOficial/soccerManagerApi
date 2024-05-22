import type { IUser } from "../user/IUser";

interface ILoginResponse {
  user: IUser;
  hp: string;
  sg: string;
};

export type { ILoginResponse };