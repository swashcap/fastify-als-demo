import 'hard-rejection/register';

import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyHealthcheck from 'fastify-healthcheck';
import fastifyHelmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import http from 'http';
import path from 'path';
import pino from 'pino';
import { v4 as uuidv4 } from 'uuid';

import { mockApi } from './mockApi';

export const server = fastify({
  /**
   * Add a custom logger.
   * {@link https://www.fastify.io/docs/latest/Server/#logger}
   */
  logger: pino({
    // Disable the logger when testing
    enabled: process.env.NODE_ENV !== 'test',
  }),
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

server.register(fastifyCors);
server.register(fastifyHealthcheck);
server.register(fastifyHelmet);
server.register(fastifyStatic, {
  prefix: '/public/',
  root: path.join(__dirname, '..', '..', 'public'),
});

server.get('/', (req) => {
  const requestIdHeader = req.headers['x-request-id'];
  let requestId =
    typeof requestIdHeader === 'string' &&
    requestIdHeader.length === 36 &&
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(
      requestIdHeader
    )
      ? requestIdHeader
      : uuidv4();
  const childLogger = (req.log as pino.Logger).child({
    mockApi: '1.0.0',
    requestId,
  });

  return mockApi(childLogger);
});

server.listen(port, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  server.log.debug(`Server listening at ${address}`);
});
