'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');
const { find } = require('lodash');
let countries;

/**
 * Optional peer dependencies.
 */

try {
  countries = require('isoc');
} catch (e) {
  // eslint-disable-next-line no-empty
}

/**
 * Export `Iso3166CountryAssert`.
 */

module.exports = function iso3166CountryAssert() {
  if (!countries) {
    throw new Error('isoc is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'Iso3166Country';

  /**
   * Data source.
   */

  this.countries = countries;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    // Test by `alpha-3` code.
    let country = find(this.countries, { alpha3: value });

    // Test by `alpha-2` code.
    if (!country) {
      country = find(this.countries, { alpha2: value });
    }

    // Test by `name`.
    const name = value.toLocaleUpperCase();

    if (!country) {
      country = find(countries, item => {
        return item.name.short.toLocaleUpperCase() === name || item.name.uppercase.toLocaleUpperCase() === name;
      });
    }

    // Country is invalid or not in a `ISO 3166-1` compatible format.
    if (!country) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
