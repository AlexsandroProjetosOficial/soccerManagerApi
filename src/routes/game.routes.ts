import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { AppError } from "../errors/AppErrors";
import type { IGetGameRequest } from "../interfaces/game/IGetGameRequest";
import type { IReply } from "../interfaces/reply/IReply";
import { GetDetailsGameUseCase } from "../modules/games/useCases/GetDetailsGame.usecase";
import { GetGamesUseCase } from "../modules/games/useCases/GetGames.usecase";
import { GetOfficialsUseCase } from "../modules/games/useCases/GetOfficials.usecase";
import { GetTimesGameUseCase } from "../modules/games/useCases/GetTimesGame.usecase";
import { PostDetailsGameUseCase } from "../modules/games/useCases/PostDetailsGame.usecase";
import { UpdateGameUseCase } from "../modules/games/useCases/UpdateGame.usecase";
import { UpdateOfficialsUseCase } from "../modules/games/useCases/UpdateOfficial.usecase";
import { GetDetailsGameSchema, GetGamesSchema, GetOfficialsSchema, GetTimesGameSchema, PostDetailsGameSchema, UpdateGameSchema, UpdatedOfficialSchema } from "../schemas";

const gameRoutes = async (fastify: FastifyInstance) => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/games',
    {
      schema: {
        querystring: GetGamesSchema,
      }
    },
    async ({ query: { user, category } }, reply) => {
      try {
        const getGamesUseCase = new GetGamesUseCase();

        const games = await getGamesUseCase.execute({ user, category });

        return await reply.code(200).send({
          error: false,
          message: 'Jogos encontrados com sucesso.',
          errors: [],
          data: {
            games
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

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/officials',
    {
      schema: {
        querystring: GetOfficialsSchema,
      }
    },
    async ({ query: { game } }, reply) => {
      try {
        const getOfficialsUseCase = new GetOfficialsUseCase();

        const officials = await getOfficialsUseCase.execute({ game });

        return await reply.code(200).send({
          error: false,
          message: 'Oficiais da partida encontrados com sucesso.',
          errors: [],
          data: {
            officials
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

  fastify.withTypeProvider<ZodTypeProvider>().patch(
    '/officials',
    {
      schema: {
        body: UpdatedOfficialSchema,
      }
    },
    async ({ body: { matchOfficial, game } }, reply) => {
      try {
        const updateOfficialsUseCase = new UpdateOfficialsUseCase();

        const officials = await updateOfficialsUseCase.execute({ matchOfficial, game });

        return await reply.code(201).send({
          error: false,
          message: 'Horário registrado com sucesso.',
          errors: [],
          data: {
            officials
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

  fastify.withTypeProvider<ZodTypeProvider>().patch(
    '/game',
    {
      schema: {
        body: UpdateGameSchema
      }
    },
    async ({ body: { game, column, value } }, reply) => {
      try {
        const updateGameUseCase = new UpdateGameUseCase();

        const timesGame = await updateGameUseCase.execute({ game, column, value });

        return await reply.code(201).send({
          error: false,
          message: 'Horário registrado com sucesso.',
          errors: [],
          data: {
            timesGame
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
    }
  )

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/times',
    {
      schema: {
        querystring: GetTimesGameSchema
      }
    },
    async ({ query: { game } }, reply) => {
      try {
        const getTimesGameUseCase = new GetTimesGameUseCase();

        const timesGame = await getTimesGameUseCase.execute(game);

        return await reply.code(200).send({
          error: false,
          message: 'Horários encontrados com sucesso.',
          errors: [],
          data: {
            timesGame
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
    }
  )

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/details',
    {
      schema: {
        querystring: GetDetailsGameSchema
      }
    },
    async ({ query: { game } }, reply) => {
      try {
        const getDetailsGameUseCase = new GetDetailsGameUseCase();

        const datailsGame = await getDetailsGameUseCase.execute(game);

        return await reply.code(200).send({
          error: false,
          message: 'Detalhes do jogo encontrado com sucesso.',
          errors: [],
          data: {
            datailsGame
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
    }
  )

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/details',
    {
      schema: {
        body: PostDetailsGameSchema
      }
    },
    async ({ body: { game, team, type, playerRegisterCardOne, playerRegisterCardTwo, result, stop, half } }, reply) => {
      try {
        const postDetailsGameUseCase = new PostDetailsGameUseCase();

        const datailsGame = await postDetailsGameUseCase.execute({ game, team, type, playerRegisterCardOne, playerRegisterCardTwo, result, stop, half });

        return await reply.code(201).send({
          error: false,
          message: 'Detalhes do jogo registrado com sucesso.',
          errors: [],
          data: {
            datailsGame
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
    }
  )
};

export { gameRoutes };