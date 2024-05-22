import { hashSync } from "bcrypt";
import { AppError } from "../../../errors/AppErrors";
import type { ICreateUserRequest } from "../../../interfaces/user/ICreateUserRequest";
import { UserRepository } from "../../../repositories/user.repository";

class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute({
    firstName,
    lastName,
    email,
    phone,
    password,
    avatar
  }: ICreateUserRequest): Promise<void> {
    try {
      const user = await this.userRepository.findUserByEmail(email);

      console.log('user --->', user);

      if (user) throw new AppError({ statusCode: 400, errors: [], message: 'Usuario ja cadastrado.' });

      const userRegistered = await this.userRepository.createUser({
        firstName,
        lastName,
        email,
        password: hashSync(password, 10),
        phone,
        avatar
      });

      if (!userRegistered) throw new AppError({ statusCode: 400, errors: [], message: 'Nao foi possivel registrar usuario.' });
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError({ message: error.message, statusCode: error.statusCode, errors: error.errors });
      }
    }
  }
}

export { CreateUserUseCase };
