'use strict';

/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');
let creditcard;

/**
 * Optional peer dependencies.
 */

try {
  creditcard = require('creditcard');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `CreditCardAssert`.
 */

module.exports = function creditCardAssert() {
  if (!creditcard) {
    throw new Error('creditcard is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'CreditCard';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Violation(this, value, { value: 'must_be_a_string_or_a_number' });
    }

    if (creditcard.validate(value) !== true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
