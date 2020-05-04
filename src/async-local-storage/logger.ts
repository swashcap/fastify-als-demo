import pino from 'pino';

import { loggerContext } from './loggerContext';

export const logger = pino({
  // Disable the logger when testing
  enabled: process.env.NODE_ENV !== 'test',

  formatters: {
    /**
     * Modify all logged objects
     * @link https://github.com/pinojs/pino/blob/HEAD/docs/api.md#log
     */
    log(object: any) {
      const requestId = loggerContext.getStore();

      if (requestId) {
        object.requestId = requestId;
      }

      return object;
    },
  },
});
