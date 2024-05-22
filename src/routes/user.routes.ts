import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { AppError } from '../errors/AppErrors';
import type { IReply } from '../interfaces/reply/IReply';
import type { ICreateUserRequest } from '../interfaces/user/ICreateUserRequest';
import { CreateUserUseCase } from '../modules/users/useCases/CreateUser.usecase';
import { CreateUserSchema } from '../schemas';
// import { authMiddleware } from '../middleware/auth.middleware';

const userRoutes = async (fastify: FastifyInstance) => {
  // fastify.addHook('onRequest', authMiddleware);

  fastify.withTypeProvider<ZodTypeProvider>().post<{
    Body: ICreateUserRequest;
    Reply: IReply | void;
  }>(
    '/create',
    {
      schema: {
        body: CreateUserSchema,
      }
    },
    async ({ body: { firstName, lastName, email, password, phone, avatar } }, reply) => {
      try {

        const createUserUseCase = new CreateUserUseCase();

        await createUserUseCase.execute({ firstName, lastName, email, password, phone, avatar });

        return await reply.code(201).send({
          error: false,
          message: 'Usuario registrado com sucesso.',
          errors: [],
          data: []
        });
      } catch (error) {
        if (error instanceof AppError) {
          return await reply.code(error.statusCode).send({
            error: error.error,
            errors: error.errors,
            message: error.message,
          });
        }
      }
    },
  );
};

export { userRoutes };
