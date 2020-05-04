import 'hard-rejection/register';

import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyHealthcheck from 'fastify-healthcheck';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import path from 'path';

const server = fastify();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

server.register(fastifyCors);
server.register(fastifyHealthcheck);
server.register(fastifyHelmet);
server.register(fastifyStatic, {
  prefix: '/public/',
  root: path.join(__dirname, '..', 'public'),
});

server.get('/', async () => {
  return 'Hello, world!';
});

server.listen(port, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
