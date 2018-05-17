const expect = require('chai').expect;
const http = require('http');
const request = require('request');

// Below code demonstrates using various methods of testing
describe('Testing Server', () => {

  before(function(done){
    require(process.cwd() + '/server/server');
    setTimeout(done, 5000); // Waiting 5 seconds for server to start
    this.timeout(10000);
  });

  it('Public endpoint returns portal homepage', (done) => {
    var responseString = '';
    var options = {
      host: 'localhost',
      port: 3001,
      path: '/'
    };

    var callback = (response) => {
      response.on('data', (chunk) => {
        responseString += chunk;
      });

      response.on('end', () => {
        expect(responseString).to.include('starter');
        done();
      });
    };

    http.request(options, callback).end();
  });


  it('Health endpoint shows status up', (done) => {
    var responseString = '';

    var options = {
      host: 'localhost',
      port: 3001,
      path: '/health'
    };

    var callback = (response) => {
      response.on('data', (chunk) => {
        responseString += chunk;
      });

      response.on('end', () => {
        expect(responseString).to.equal('{"status":"UP"}');
        done();
      });
    };

    http.request(options, callback).end();
  });

});
