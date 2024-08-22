// 3-payment.test.js

const { describe, it } = require('mocha');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./3-payment');
const Utils = require('./utils');
const assert = require('assert');

describe('sendPaymentRequestToApi', function () {
  it('check that Utils.calculateNumber is stubbed', function () {
    // Create a spy for console.log
    const spy = sinon.spy(console, 'log');
    // Stub the calculateNumber method
    const stub = sinon.stub(Utils, 'calculateNumber').returns(10);
    
    // Call the function to be tested
    sendPaymentRequestToApi(100, 20);

    // Assertions
    assert(spy.calledOnceWith('The total is: 10'));
    assert(stub.calledOnceWith('SUM', 100, 20));

    // Restore the original functionality
    spy.restore();
    stub.restore();
  });
});
