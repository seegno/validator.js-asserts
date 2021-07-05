'use strict';

/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');
let moment;

/**
 * Optional peer dependencies.
 */

try {
  moment = require('moment');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `DateAssert`.
 */

module.exports = function dateAssert({ format } = {}) {
  /**
   * Class name.
   */

  this.__class__ = 'Date';

  /**
   * Validate format.
   */

  if (format) {
    if (!moment) {
      throw new Error('moment is not installed');
    }
  }

  /**
   * Format to match the input.
   */

  this.format = format;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new Violation(this, value, { value: 'must_be_a_date_or_a_string' });
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new Violation(this, value);
    }

    if (!this.format) {
      return true;
    }

    if (!moment(value, this.format, true).isValid()) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
