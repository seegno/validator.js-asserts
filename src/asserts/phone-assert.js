'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');
let PhoneNumberUtil;

/**
 * Optional peer dependencies.
 */

try {
  ({ PhoneNumberUtil } = require('google-libphonenumber'));
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `Phone`.
 */

module.exports = function phoneAssert({ countryCode } = {}) {
  if (!PhoneNumberUtil) {
    throw new Error('google-libphonenumber is not installed');
  }

  /**
   * Phone util instance.
   */

  const phoneUtil = PhoneNumberUtil.getInstance();

  /**
   * Class name.
   */

  this.__class__ = 'Phone';

  /**
   * Country code to test the phone number in. May be not be set if the number is
   * guaranteed to start with a '+' followed by the country calling code (E164).
   */

  this.countryCode = countryCode;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    try {
      const phone = phoneUtil.parse(value, this.countryCode);

      if (!phoneUtil.isValidNumber(phone)) {
        throw new Error('Phone is not valid');
      }

      if (this.countryCode && !phoneUtil.isValidNumberForRegion(phone, this.countryCode)) {
        throw new Error(`Phone does not belong to country "${this.countryCode}"`);
      }
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
