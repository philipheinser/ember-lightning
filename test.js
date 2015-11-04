'use strict';

const should = require('should');
const expect = require('chai').expect;
const redis = require('redis');
const co = require('co');
const coRedis = require('co-redis');
const client  = redis.createClient(
	process.env.REDIS_PORT,
	process.env.REDIS_HOST
);
const dbCo = coRedis(client);

process.env.NODE_ENV = 'test';
process.env.APP_NAME = 'test';

const app = require('./index').app
const request = require('co-supertest').agent(app.listen());

beforeEach(function() {

	return co(function*() {
		yield dbCo.set('test:current', '12345');
		yield dbCo.set('test:12345', 'Hello, World');
		yield dbCo.set('test:67890', 'Hello, index_key');
	});
});

describe('index', function () {

 it('should return 200', function (done) {
   request
     .get('/')
     .expect(200)
     .end(function (err, res) {
       should.not.exist(err);
       expect(res.text).to.equal('Hello, World');
       done();
     });
 });
});

describe('index_key', function () {

 it('should return 200', function (done) {
   request
     .get('/?index_key=67890')
     .expect(200)
     .end(function (err, res) {
       should.not.exist(err);
       expect(res.text).to.equal('Hello, index_key');
       done();
     });
 });
});