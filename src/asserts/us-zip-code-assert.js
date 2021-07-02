'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');

/**
 * US zip code regular expression.
 */

const regexp = new RegExp(/^\d{5}(?:[- ]?\d{4})?$/);

/**
 * Export `UsZipCodeAssert`.
 */

module.exports = function usZipCodeAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'UsZipCode';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!regexp.test(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
