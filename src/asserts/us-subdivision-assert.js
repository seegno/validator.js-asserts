
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';
import { chain, difference, intersection } from 'lodash';

/**
 * List of subdivisions.
 */

const subdivisions = {
  districts: ['DC'],
  outlying: ['AS', 'GU', 'MP', 'PR', 'UM', 'VI'],
  states: [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID',
    'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT',
    'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'
  ]
};

const keys = Object.keys(subdivisions);

/**
 * Export `UsSubdivisionAssert`.
 */

export default function usSubdivisionAssert({ categories: categories = keys, alpha2Only: alpha2Only = false } = {}) {
  /**
   * Class name.
   */

  this.__class__ = 'UsSubdivision';

  /**
   * Validate categories.
   */

  if (categories && intersection(keys, categories).length !== categories.length) {
    throw new Error(`Unsupported categories "${difference(categories, keys)}" given`);
  }

  /**
   * Whether to test only for alpha-2 codes (`CA`) or not (`US-CA`).
   * By default, both forms are allowed.
   */

  this.alpha2Only = alpha2Only;

  /**
   * Categories.
   */

  this.categories = categories;

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (typeof value !== 'string') {
      // jscs: disable requireCamelCaseOrUpperCaseIdentifiers
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (this.alpha2Only && value.length !== 2) {
      throw new Violation(this, value);
    }

    let code = value;

    if (value.length > 2) {
      // Make sure that if we're not dealing with an `alpha2` code, then the code is in the `US-XX` format.
      if (/^US-[A-Z]{2}$/.test(value) === false) {
        throw new Violation(this, value);
      }

      // Get the `alpha2` code part used for validation.
      code = value.substr(-2);
    }

    const result = chain(subdivisions).pick(this.categories).values().flatten().includes(code).value();

    if (result !== true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}