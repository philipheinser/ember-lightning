'use strict';

const redis = require('redis'),
    co = require('co'),
    coRedis = require('co-redis'),
    Koa = require('koa');

const app = exports.app = new Koa(),
    client  = redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST
    ),
    dbCo = coRedis(client);

if (process.env.REDIS_SECRET) {
  client.auth(process.env.REDIS_SECRET);
}

client.on('error', function (err) {
  console.log('Redis client error: ' + err);
});

app.use(co.wrap(function* (ctx) {

  var indexkey;

  if (ctx.request.query.index_key) {
    indexkey = process.env.APP_NAME +':'+ ctx.request.query.index_key;
  } else {
    indexkey = yield dbCo.get(process.env.APP_NAME +':current');
    indexkey = process.env.APP_NAME + ':' + indexkey;
  }
  var index = yield dbCo.get(indexkey);

  if (index) {
    ctx.body = index;
  } else {
    ctx.status = 404;
  }
}));

app.listen(process.env.PORT || 3000);
