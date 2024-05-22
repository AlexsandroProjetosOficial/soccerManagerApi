import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
      avatar: string;
    }
  }
}