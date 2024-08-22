// 6-payment_token.test.js
const getPaymentTokenFromAPI = require('./6-payment_token');
const { expect } = require('chai');

describe('getPaymentTokenFromAPI', function () {
  it('should return a resolved promise with data when success is true', function (done) {
    getPaymentTokenFromAPI(true)
      .then((response) => {
        expect(response).to.have.property('data');
        expect(response.data).to.equal('Successful response from the API');
        done();
      })
      .catch((error) => done(error));
  });

  it('should do nothing when success is false', function (done) {
    const result = getPaymentTokenFromAPI(false);
    expect(result).to.be.undefined;
    done();
  });
});
