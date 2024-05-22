import type { FastifyReply, FastifyRequest } from "fastify";

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    console.log('request', request);

    const hp = request.cookies.hp;
    const sg = request.cookies.sg;

    console.log('hp', hp);
    console.log('sg', sg);

    if (!hp || !sg) {
      await reply.code(401).send({
        error: true,
        errors: [],
        message: 'token invalido',
      });
    };

    const token = `${hp}.${sg}`;

    if (!token) {
      await reply.code(401).send({
        error: true,
        errors: [],
        message: 'token invalido',
      });
    };

    request.jwtVerify()
      .then((decodedToken) => console.log('decodedToken', decodedToken))
  } catch (error) {
    console.log(error);
  }
};

export { authMiddleware };