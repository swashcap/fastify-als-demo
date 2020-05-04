/**
 * fastify-healthcheck
 *
 * @link https://github.com/smartiniOnGitHub/fastify-healthcheck
 */
declare module 'fastify-healthcheck' {
  import { FastifyInstance } from 'fastify';

  const plugin: Parameters<FastifyInstance['register']>[0];

  export default plugin;
}
