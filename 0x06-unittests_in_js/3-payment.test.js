// 3-payment.test.js
const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', function () {
  let spy;

  beforeEach(function () {
    // Create a spy for Utils.calculateNumber
    spy = sinon.spy(Utils, 'calculateNumber');
  });

  afterEach(function () {
    // Restore the original function
    spy.restore();
  });

  it('should call Utils.calculateNumber with type SUM', function () {
    sendPaymentRequestToApi(100, 20);

    // Check if the spy was called with the correct arguments
    assert(spy.calledWith('SUM', 100, 20));
  });

  it('should display the correct message in console', function () {
    const consoleLogSpy = sinon.spy(console, 'log');
    sendPaymentRequestToApi(100, 20);

    // Check if console.log was called with the correct message
    assert(consoleLogSpy.calledWith('The total is: 120'));

    // Restore the original console.log function
    consoleLogSpy.restore();
  });
});
