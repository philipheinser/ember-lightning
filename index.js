'use strict';

var redis = require('redis'),
    coRedis = require('co-redis'),
    router = require('koa-router'),
    koa = require('koa');

var app = koa(),
    client  = redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST
    ),
    dbCo = coRedis(client);

client.auth(process.env.REDIS_SECRET);

app.use(router(app));

app.get('/', function* (next) {

  var current = yield dbCo.get(process.env.APP_NAME +':current');
  var index = yield dbCo.get(current);

  this.body = index || '';
});

app.listen(process.env.PORT || 3000);
