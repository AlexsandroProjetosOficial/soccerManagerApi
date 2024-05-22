import { readFileSync } from "node:fs";
import path, { resolve } from "node:path";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import jwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastify, { type FastifyInstance } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { gameRoutes } from "./routes/game.routes";
import { systemRoutes } from "./routes/system.routes";
import { userRoutes } from "./routes/user.routes";

const app: FastifyInstance = fastify({ logger: true });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: true });

app.register(jwt, {
  secret: {
    private: {
      key: readFileSync(`${path.join(resolve(__dirname, '..'), 'configs/certs')}/private.pem`, 'utf8'),
      passphrase: 'The best management system in soccer'
    },
    public: readFileSync(`${path.join(resolve(__dirname, '..'), 'configs/certs')}/public.pem`, 'utf8')
  },
  sign: {
    algorithm: 'RS256',
    expiresIn: '12h'
  }
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SampleApi',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: '/documentation',
});

app.register(fastifyCookie);
app.register(systemRoutes, { prefix: '/api/v1/system' });
app.register(userRoutes, { prefix: '/api/v1/user' });
app.register(gameRoutes, { prefix: '/api/v1/game' });

const main = async () => {
  try {
    await app.listen({ port: 8080, host: '192.168.0.10' });
  } catch (error) {
    console.error(error);
    app.log.error(error);
    process.exit(1);
  }
};

main();