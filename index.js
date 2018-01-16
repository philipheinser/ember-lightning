'use strict';

const redis = require('redis'),
    coRedis = require('co-redis'),
    Koa = require('koa');

const app = exports.app = new Koa(),
    client  = redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST,
      {
        db: process.env.REDIS_DB
          ? process.env.REDIS_DB : undefined
      }
    ),
    dbCo = coRedis(client);

if (process.env.REDIS_SECRET) {
  client.auth(process.env.REDIS_SECRET);
}

client.on('error', function (err) {
  console.log('Redis client error: ' + err);
});

app.use(async function (ctx) {
  let indexkey;

  if (ctx.request.query.index_key) {
    indexkey = process.env.APP_NAME + ':' + ctx.request.query.index_key;
  } else {
    indexkey = process.env.APP_NAME + ':current-content';
  }
  const index = await dbCo.get(indexkey);

  if (index) {
    ctx.body = index;
  } else {
    ctx.status = 404;
  }
});

const server = app.listen(process.env.PORT || 3000);

process.on('SIGINT', function () {
  server.close(function () {
    process.exit(0);
  });
});
