import type { ILoginRequest } from "../interfaces/system/ILoginRequest";
import type { ICreateUserRequest } from "../interfaces/user/ICreateUserRequest";
import type { IUser } from "../interfaces/user/IUser";
import type { IUserRepository } from "../interfaces/user/IUserRepository";
import { prisma } from "../prisma/prisma";

class UserRepository implements IUserRepository {
  async createUser({ firstName, lastName, email, password, avatar, phone }: ICreateUserRequest): Promise<IUser | null> {
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        avatar,
        phone
      }
    });

    return user || null;
  };

  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    return user || null;
  };
};

export { UserRepository };