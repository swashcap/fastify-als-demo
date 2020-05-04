# fastify-als-demo

A demo with [Fastify](https://www.fastify.io) and Node.js's
[`AsyncLocalStorage`](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage).

## Performance comparison:

Some basic metrics when running locally on the dev machine:

```shell
ab -n 1000 -c 10 "http://127.0.0.1:3000/"
```

### async-local-storage

* Maximum MEM (via `top`): 23M
* Requests (via `ab`):

    ```
    Requests per second:    93.49 [#/sec] (mean)
    Time per request:       106.967 [ms] (mean)
    Time per request:       10.697 [ms] (mean, across all concurrent requests)
    ```

### logger-passing

* Maximum MEM (via `top`): 27M
* Requests (via `ab`):

    ```
    Requests per second:    93.56 [#/sec] (mean)
    Time per request:       106.880 [ms] (mean)
    Time per request:       10.688 [ms] (mean, across all concurrent requests)
    ```

## Setup

With [Node.js](https://nodejs.org/en/) (>=14.1.x) and
[yarn](https://yarnpkg.com) (>=1.22.x) installed:

1. Install dependencies:

    ```shell
    yarn
    ```
2. Build the project:

    ```shell
    yarn build
    ```
3. Run the server:

    ```shell
    yarn start
    ```
4. Send a request:

    ```shell
    curl localhost:3000
    {"data":{"mock":"mock"}}
    ```

You should see trace-able `requestId` properties on log events. For example,
with `yarn --silent start | jq`:

```shell
{
  "level": 30,
  "time": 1588610966799,
  "pid": 5721,
  "hostname": "swash.local",
  "reqId": 1,
  "req": {
    "method": "GET",
    "url": "/",
    "hostname": "localhost:3000",
    "remoteAddress": "127.0.0.1",
    "remotePort": 54634
  },
  "requestId": "382a4b0b-fc29-4e12-9862-10bc300ce2bb",
  "msg": "incoming request"
}
{
  "level": 30,
  "time": 1588610966902,
  "pid": 5721,
  "hostname": "swash.local",
  "mockApi": "1.0.0",
  "message": "end",
  "requestId": "382a4b0b-fc29-4e12-9862-10bc300ce2bb"
}
{
  "level": 30,
  "time": 1588610966907,
  "pid": 5721,
  "hostname": "swash.local",
  "reqId": 1,
  "res": {
    "statusCode": 200
  },
  "responseTime": 108.17437699995935,
  "requestId": "382a4b0b-fc29-4e12-9862-10bc300ce2bb",
  "msg": "request completed"
}
```
