'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');
let iban;

/**
 * Optional peer dependencies.
 */

try {
  iban = require('iban');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `InternationalBankAccountNumberAssert`.
 */

module.exports = function internationalBankAccountNumberAssert() {
  if (!iban) {
    throw new Error('iban is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'InternationalBankAccountNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!iban.isValid(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
