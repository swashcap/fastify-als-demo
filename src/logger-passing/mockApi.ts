import { Logger } from 'pino';
import { promisify } from 'util';

const delay = promisify(setTimeout);

export const mockApi = async (logger: Logger) => {
  logger.debug({
    message: 'start',
  });

  await delay(100);

  if (Math.random() > 0.9) {
    const error = new Error('mockApi failed');

    logger.error({
      error,
      message: 'error',
    });

    throw error;
  }

  logger.info({
    message: 'end',
  });

  return {
    data: {
      mock: 'mock',
    },
  };
};
