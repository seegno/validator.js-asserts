
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';
import { some } from 'lodash';
import provinces from 'provinces';

/**
 * Export `UsStateAssert`.
 */

export default function() {

  /**
   * Class name.
   */

  this.__class__ = 'UsState';

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (some(provinces, { short: value, country: 'US' }) !== true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}