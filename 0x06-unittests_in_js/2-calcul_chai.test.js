const expect = require('chai').expect;
const { describe, it } = require('mocha');
const assert = require('assert');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', function () {
  describe('SUM operation', function () {
    it('should return 6 when inputs are 1.4 and 4.5', function () {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
    });
  });

  describe('SUBTRACT operation', function () {
    it('should return -3 when inputs are 1 and 3.7', function () {
      expect(calculateNumber('SUBTRACT', 1, 3.7)).to.equal(-3);
    });
  });

  describe('DIVIDE operation', function () {
    it('should return 3.5 when inputs are 6.9 and 1.7', function () {
      expect(calculateNumber('DIVIDE', 6.9, 1.7)).to.equal(3.5);
    });

    it('should return "Error" when inputs are 1.4 and 0', function () {
      expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
    });
  });
});
