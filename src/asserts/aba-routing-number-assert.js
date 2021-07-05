'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');
let abaValidator;

/**
 * Optional peer dependencies.
 */

try {
  abaValidator = require('abavalidator');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `AbaRoutingNumberAssert`.
 */

module.exports = function abaRoutingNumberAssert() {
  if (!abaValidator) {
    throw new Error('abaValidator is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'AbaRoutingNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!abaValidator.validate(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
