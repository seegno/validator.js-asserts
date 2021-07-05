'use strict';

/**
 * Module dependencies.
 */

const { Assert: is, Validator, Violation } = require('validator.js');
let validator;

/**
 * Optional peer dependencies.
 */

try {
  validator = require('validator');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `EmailAssert`.
 */

module.exports = function emailAssert() {
  if (!validator) {
    throw new Error('validator is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'Email';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!validator.isEmail(value)) {
      throw new Violation(this, value);
    }

    try {
      is.ofLength({ max: 254 }).validate(value);
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
