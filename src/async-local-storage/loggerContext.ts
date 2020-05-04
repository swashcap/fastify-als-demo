import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuidv4 } from 'uuid';

/**
 * @link https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage
 */
export const loggerContext = new AsyncLocalStorage<string>();

export const createStore = (requestIdHeader: any) => {
  if (
    typeof requestIdHeader === 'string' &&
    requestIdHeader.length === 36 &&
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(
      requestIdHeader
    )
  ) {
    return requestIdHeader;
  }

  return uuidv4();
};
