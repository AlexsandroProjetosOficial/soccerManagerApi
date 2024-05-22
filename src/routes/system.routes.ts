import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { AppError } from '../errors/AppErrors';
import type { IReply } from '../interfaces/reply/IReply';
import type { ILoginRequest } from '../interfaces/system/ILoginRequest';
import { authMiddleware } from '../middleware/auth.middleware';
import { LoginUseCase } from '../modules/system/useCases/Login.usecase';
import { LoginSchema } from '../schemas';

const systemRoutes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().post<{
    Body: ILoginRequest;
    Reply: IReply | void;
  }>(
    '/login',
    {
      schema: {
        body: LoginSchema,
      }
    },
    async ({ body: { email, password } }, reply) => {
      try {

        console.log('email, password', email, password);

        const loginUseCase = new LoginUseCase(fastify);

        const userLogged = await loginUseCase.execute({ email, password });

        const user = userLogged ? userLogged.user : {};
        const hp = userLogged ? userLogged.hp : '';
        const sg = userLogged ? userLogged.sg : '';

        reply.setCookie('hp', hp, { path: '/', expires: new Date(Date.now() + 12 * 3600000) })
        reply.setCookie('sg', sg, { path: '/', expires: new Date(Date.now() + 12 * 3600000) })

        return await reply.code(200).send({
          error: false,
          message: 'Login realizado com sucesso.',
          errors: [],
          data: {
            user
          }
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

  fastify.get<{
    Reply: IReply | void;
  }>(
    '/logout',
    async (_req, reply) => {
      try {
        console.log('entrou no try do logout');

        reply.clearCookie('hp');
        reply.clearCookie('sg');

        return await reply.code(200).send({
          error: false,
          message: 'Logout realizado com sucesso.',
          errors: []
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
    })
};

export { systemRoutes };
