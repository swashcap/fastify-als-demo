import { promisify } from 'util';

import { logger } from './logger';

const delay = promisify(setTimeout);

const mockApiLogger = logger.child({
  mockApi: '1.0.0'
});

export const mockApi = async () => {
  mockApiLogger.debug({
    message: 'start'
  });

  await delay(100);

  if (Math.random() > .9) {
    const error = new Error('mockApi failed')

    mockApiLogger.error({
      error,
      message: 'error'
    });

    throw error;
  }

  mockApiLogger.info({
    message: 'end'
  });

  return {
    data: {
      mock: 'mock'
    }
  }
}