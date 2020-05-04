import 'hard-rejection/register';

import fastify from 'fastify';

const server = fastify();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

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
