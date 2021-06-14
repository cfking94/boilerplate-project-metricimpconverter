const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('routes', function() {
    test('convert a valid input', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1)
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
    });

    test('convert an invalid input', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid unit');
          done();
        });
    });

    test('convert an invalid number', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number');
          done();
        });
    });

    test('convert an invalid number and unit', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'invalid number and unit');
          done();
        });
    });

    test('convert with no number', function(done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        });
    });
  });
});
