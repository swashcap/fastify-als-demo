import 'hard-rejection/register';

import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyHealthcheck from 'fastify-healthcheck';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import http from 'http';
import path from 'path';

import { createStore, loggerContext } from './loggerContext';
import { logger } from './logger';
import { mockApi } from './mockApi';

export const server = fastify({
  /**
   * Add a custom logger.
   * {@link https://www.fastify.io/docs/latest/Server/#logger}
   */
  logger,

  /**
   * Customize the server.
   * {@link https://www.fastify.io/docs/latest/Server/#serverfactory}
   */
  serverFactory(handler) {
    const server = http.createServer((req, res) => {
      loggerContext.run(createStore(req.headers['x-request-id']), () => {
        handler(req, res);
      });
    });

    return server;
  },
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

server.register(fastifyCors);
server.register(fastifyHealthcheck);
server.register(fastifyHelmet);
server.register(fastifyStatic, {
  prefix: '/public/',
  root: path.join(__dirname, '..', '..', 'public'),
});

server.get('/', mockApi);

server.listen(port, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  server.log.debug(`Server listening at ${address}`);
});
