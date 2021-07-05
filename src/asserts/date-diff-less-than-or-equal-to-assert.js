'use strict';

/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');
const { assign } = require('lodash');
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
 * Export `DateDiffLessThanOrEqualToAssert`.
 */

module.exports = function dateDiffLessThanOrEqualToAssert(threshold, options) {
  if (!moment) {
    throw new Error('moment is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'DateDiffLessThanOrEqualTo';

  /**
   * Check if `threshold` is defined.
   */

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  /**
   * Threshold.
   */

  this.threshold = threshold;

  /**
   * Options.
   */

  this.options = assign(
    this,
    {
      absolute: false,
      asFloat: false,
      fromDate: null,
      unit: 'milliseconds'
    },
    options
  );

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new Violation(this, value, { value: 'must_be_a_date_or_a_string' });
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new Violation(this, value, {
        absolute: this.absolute,
        asFloat: this.asFloat,
        fromDate: this.fromDate,
        threshold: this.threshold,
        unit: this.unit
      });
    }

    let diff = moment(this.fromDate || Date.now()).diff(value, this.unit, this.asFloat);

    if (this.absolute) {
      diff = Math.abs(diff);
    }

    if (diff > this.threshold) {
      throw new Violation(this, value, {
        absolute: this.absolute,
        asFloat: this.asFloat,
        diff,
        fromDate: this.fromDate,
        threshold: this.threshold,
        unit: this.unit
      });
    }

    return true;
  };

  return this;
};
