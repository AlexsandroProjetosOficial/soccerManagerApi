import type { ICreateUserRequest } from "./ICreateUserRequest";
import type { IUser } from "./IUser";

interface IUserRepository {
  findUserByEmail(email: string): Promise<IUser | null>;
  createUser(prosp: ICreateUserRequest): Promise<IUser | null>;
};

export type { IUserRepository };