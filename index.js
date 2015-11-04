'use strict';

var redis = require('redis'),
    coRedis = require('co-redis'),
    koa = require('koa');

var app = koa(),
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

app.use(function* () {

  var indexkey;

  if (this.request.query.index_key) {
    indexkey = process.env.APP_NAME +':'+ this.request.query.index_key;
  } else {
    indexkey = yield dbCo.get(process.env.APP_NAME +':current');
    indexkey = process.env.APP_NAME + ':' + indexkey;
  }
  var index = yield dbCo.get(indexkey);

  if (index) {
    this.body = index;
  } else {
    this.status = 404;
  }
});

app.listen(process.env.PORT || 3000);
