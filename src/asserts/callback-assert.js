'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const { Violation } = require('validator.js');

/**
 * Constants.
 */

const expression = /^[a-zA-Z]+$/;

/**
 * Export `CallbackAssert`.
 */

module.exports = function (fn, customClass) {
  /**
   * Class name.
   */

  if (!_.isString(customClass) || !expression.test(customClass)) {
    throw new Error('Callback must be instantiated with a valid custom class name');
  }

  this.__class__ = customClass;

  /**
   * Fn.
   */

  if (!_.isFunction(fn)) {
    throw new Error('Callback must be instantiated with a function');
  }

  this.fn = fn;

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    let result;

    try {
      result = this.fn(value);
    } catch (error) {
      throw new Violation(this, value, { error });
    }

    if (result !== true) {
      throw new Violation(this, value, { result });
    }

    return true;
  };

  return this;
};
