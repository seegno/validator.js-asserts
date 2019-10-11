'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const BigNumberAssert = require('./big-number-assert');

/**
 * Export `BigNumberLessThanOrEqualToAssert`.
 */

module.exports = function bigNumberLessThanOrEqualToAssert(threshold, { validateSignificantDigits = true } = {}) {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  BigNumber.DEBUG = !!validateSignificantDigits;

  /**
   * Extend `Assert` with `BigNumberAssert`.
   */

  const Assert = BaseAssert.extend({ BigNumber: BigNumberAssert });

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberLessThanOrEqualTo';

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  Assert.bigNumber({ validateSignificantDigits }).validate(threshold);

  this.threshold = new BigNumber(threshold);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    Assert.bigNumber({ validateSignificantDigits }).validate(value);

    try {
      const number = new BigNumber(value);

      if (!number.isLessThanOrEqualTo(this.threshold)) {
        throw new Error();
      }
    } catch (e) {
      const context = { threshold: this.threshold.toString() };

      if (e.message.startsWith('[BigNumber Error]')) {
        context.message = e.message;
      }

      throw new Violation(this, value, context);
    }

    return true;
  };

  return this;
};
