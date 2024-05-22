import { compareSync } from "bcrypt";
import type { FastifyInstance } from "fastify";
import { AppError } from "../../../errors/AppErrors";
import type { ILoginRequest } from "../../../interfaces/system/ILoginRequest";
import type { ILoginResponse } from "../../../interfaces/system/ILoginResponse";
import { UserRepository } from "../../../repositories/user.repository";

class LoginUseCase {
  private userRepository: UserRepository;
  private fastify: FastifyInstance;

  constructor(fastiFy: FastifyInstance) {
    this.userRepository = new UserRepository()
    this.fastify = fastiFy;
  }

  async execute({ email, password }: ILoginRequest): Promise<ILoginResponse | void> {
    try {
      //const hashPassword = hashSync(password, 10);
      const user = await this.userRepository.findUserByEmail(email);

      console.log('user --->', user);

      if (!user) throw new AppError({ statusCode: 400, errors: [], message: 'E-mail ou senha inválido.' });
      if (!user.password) throw new AppError({ statusCode: 400, errors: [], message: 'E-mail ou senha inválido.' });
      if (user.password && !compareSync(password, user.password)) throw new AppError({ statusCode: 400, errors: [], message: 'E-mail ou senha inválido.' });

      const token = this.fastify.jwt.sign(
        {
          userId: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          avatar: user.avatar
        },
      );

      console.log('token', token);

      const [hpOne, hpTwo, sgOne] = token.split('.');
      const hp = `${hpOne}.${hpTwo}`;
      const sg = `${sgOne}`;

      delete user.createdAt;
      delete user.updatedAt;
      delete user.password;

      console.log(user);

      return {
        user,
        hp,
        sg
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw new AppError({ message: error.message, statusCode: error.statusCode, errors: error.errors });
      }
    }
  }
}

export { LoginUseCase };
