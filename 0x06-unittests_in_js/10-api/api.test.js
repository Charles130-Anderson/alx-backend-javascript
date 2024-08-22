const { expect } = require('chai');
const request = require('request');
const { spawn } = require('child_process');
const path = require('path');

let serverProcess;

// Start the server before running tests
before((done) => {
  serverProcess = spawn('node', [path.join(__dirname, 'api.js')]);
  serverProcess.stdout.on('data', (data) => {
    if (data.toString().includes('API available on localhost port 7865')) {
      done();
    }
  });
  serverProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
});

// Stop the server after tests
after((done) => {
  serverProcess.kill();
  done();
});

describe('Integration Testing', () => {
  describe('GET /', () => {
    it('Code: 200 | Body: Welcome to the payment system', (done) => {
      const options = {
        url: 'http://localhost:7865/',
        method: 'GET',
      };

      request(options, function (error, response, body) {
        if (error) return done(error);
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome to the payment system');
        done();
      });
    });
  });

  describe('GET /cart/:id', () => {
    [12, 1, 123].forEach(id => {
      it(`Responds with 200 and id ${id} in msg`, (done) => {
        const options = {
          url: `http://localhost:7865/cart/${id}`,
          method: 'GET',
        };

        request(options, function (error, response, body) {
          if (error) return done(error);
          expect(response.statusCode).to.equal(200);
          expect(body).to.equal(`Payment methods for cart ${id}`);
          done();
        });
      });
    });

    ['a12', 'a12b', '12b', 'hello'].forEach(id => {
      it(`Responds with 404 for invalid id ${id}`, (done) => {
        const options = {
          url: `http://localhost:7865/cart/${id}`,
          method: 'GET',
        };

        request(options, function (error, response, body) {
          if (error) return done(error);
          expect(response.statusCode).to.equal(404);
          done();
        });
      });
    });
  });

  describe('GET /available_payments', () => {
    it('Responds with correct JSON structure', (done) => {
      const options = {
        url: 'http://localhost:7865/available_payments',
        method: 'GET',
        json: true
      };

      request(options, function (error, response, body) {
        if (error) return done(error);
        expect(response.statusCode).to.equal(200);
        expect(body).to.deep.equal({
          payment_methods: {
            credit_cards: true,
            paypal: false
          }
        });
        done();
      });
    });
  });

  describe('POST /login', () => {
    it('Responds with Welcome username', (done) => {
      const options = {
        url: 'http://localhost:7865/login',
        method: 'POST',
        body: { userName: 'Betty' },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) return done(error);
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome Betty');
        done();
      });
    });
  });
});
