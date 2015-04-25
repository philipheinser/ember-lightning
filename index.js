'use strict';
var config = require('./app.json');

var redis = require('redis'),
    coRedis = require('co-redis'),
    koa = require('koa');

var app = koa(),
    client = redis.createClient(
      config.env.REDIS_PORT.value,
      config.env.REDIS_HOST.value
    ),
    dbCo = coRedis(client);

client.auth(config.env.REDIS_SECRET.value);

app.use(function* () {
  var indexkey;

  if (this.request.query.index_key) {
    indexkey = config.env.APP_NAME.value +':'+ this.request.query.index_key;
  } else {
    indexkey = yield dbCo.get(config.env.APP_NAME.value +':current');
  }
  var index = yield dbCo.get(indexkey);

  this.body = index || '';
});

app.listen(config.env.APP_PORT.value || 8787);
