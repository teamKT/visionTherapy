process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

// beforeEach(done => {

// });

// afterEach(done => {

// });

describe('GET request on / route', () => {
  it('expect 200 status', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  });
});