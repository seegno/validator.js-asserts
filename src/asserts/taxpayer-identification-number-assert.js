'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');
let tin;

/**
 * Optional peer dependencies.
 */

try {
  tin = require('tin-validator');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `TaxpayerIdentificationNumberAssert`.
 */

module.exports = function taxpayerIdentificationNumberAssert() {
  if (!tin) {
    throw new Error('tin-validator is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'TaxpayerIdentificationNumber';

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!tin.isValid(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
