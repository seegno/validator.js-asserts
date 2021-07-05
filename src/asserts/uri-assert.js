'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const { Validator, Violation } = require('validator.js');
const { forEach, has } = require('lodash');

/**
 * Export `UriAssert`.
 */

module.exports = function uriAssert(constraints) {
  /**
   * Optional peer dependencies.
   */

  const URI = require('urijs');

  /**
   * Class name.
   */

  this.__class__ = 'Uri';

  /**
   * Constraints.
   */

  this.constraints = constraints || {};

  /**
   * Validate constraints.
   */

  forEach(this.constraints, (constraint, key) => {
    if (!has(URI.prototype, key)) {
      throw new Error(`Invalid constraint "${key}=${constraint}"`);
    }
  });

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    const uri = new URI(value);

    // URIs must have at least a hostname and protocol.
    if (_.isEmpty(this.constraints) && (!uri.hostname() || !uri.protocol())) {
      throw new Violation(this, value, { constraints: this.constraints });
    }

    // Validate that each constraint matches exactly.
    forEach(
      this.constraints,
      (constraint, key) => {
        if (key === 'is' && uri[key](constraint)) {
          return;
        }

        if (key !== 'is' && constraint === uri[key]()) {
          return;
        }

        throw new Violation(this, value, { constraints: this.constraints });
      },
      this
    );

    return true;
  };

  return this;
};
