'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const DateDiffLessThanOrEqualToAssert = require('../../src/asserts/date-diff-less-than-or-equal-to-assert');
const sinon = require('sinon');

/**
 * Extend `Assert` with `DateDiffLessThanOrEqualToAssert`.
 */

const Assert = BaseAssert.extend({
  DateDiffLessThanOrEqualTo: DateDiffLessThanOrEqualToAssert
});

/**
 * Test `DateDiffLessThanOrEqualToAssert`.
 */

describe('DateDiffLessThanOrEqualToAssert', () => {
  it('should throw an error if `threshold` is missing', () => {
    try {
      Assert.dateDiffLessThanOrEqualTo();

      fail();
    } catch (e) {
      expect(e.message).toBe('A threshold value is required.');
    }
  });

  it('should have a default option `absolute` of `false`', () => {
    const assert = Assert.dateDiffLessThanOrEqualTo(1);

    expect(assert.options.absolute).toBe(false);
  });

  it('should have a default option `asFloat` of `false`', () => {
    const assert = Assert.dateDiffLessThanOrEqualTo(1);

    expect(assert.options.asFloat).toBe(false);
  });

  it('should have a default option `fromDate` of `null`', () => {
    const assert = Assert.dateDiffLessThanOrEqualTo(1);

    expect(assert.options.fromDate).toBeNull();
  });

  it('should have a default option `unit` of `milliseconds`', () => {
    const assert = Assert.dateDiffLessThanOrEqualTo(1);

    expect(assert.options.unit).toBe('milliseconds');
  });

  it('should throw an error if the input value is not a date', () => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        Assert.dateDiffLessThanOrEqualTo(10).validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_date_or_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid date', () => {
    try {
      Assert.dateDiffLessThanOrEqualTo(10).validate('2015-99-01');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().value).toBe('2015-99-01');
    }
  });

  it('should throw an error if the diff between `now` and input date is greater than the `threshold`', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    try {
      Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-30'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).not.toBe(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the `absolute` diff between `now` and input date is greater than the `threshold`', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    try {
      Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-03'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).not.toBe(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is greater than the `threshold`', () => {
    try {
      Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, { fromDate: new Date('1970-01-01') }).validate(
        new Date('1969-12-30')
      );

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).not.toBe(e.show().violation.diff);
    }
  });

  it('should throw an error if the `absolute` diff between `fromDate` and input date is greater than the `threshold`', () => {
    try {
      Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, {
        absolute: true,
        fromDate: new Date('1970-01-01')
      }).validate(new Date('1970-01-03'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).not.toBe(e.show().violation.diff);
    }
  });

  it('should expose `assert` equal to `DateDiffLessThanOrEqualToAssert`', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    try {
      Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-30'));

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('DateDiffLessThanOrEqualTo');
    }

    clock.restore();
  });

  it('should expose `absolute`, `asFloat`, `diff`, `fromDate`, `threshold` and `unit` on the violation', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    try {
      Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-30'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(Object.keys(e.show().violation)).toMatchObject([
        'absolute',
        'asFloat',
        'diff',
        'fromDate',
        'threshold',
        'unit'
      ]);
    }

    clock.restore();
  });

  it('should accept option `asFloat`', () => {
    const assert = Assert.dateDiffLessThanOrEqualTo(0, { asFloat: true });

    expect(assert.options.asFloat).toBe(true);
  });

  it('should accept option `fromDate`', () => {
    const assert = Assert.dateDiffLessThanOrEqualTo(0, { fromDate: new Date('1970-01-01') });

    expect(assert.options.fromDate).toEqual(new Date('1970-01-01'));
  });

  it('should accept option `unit`', () => {
    const assert = Assert.dateDiffLessThanOrEqualTo(24, { unit: 'hours' });

    expect(assert.options.unit).toBe('hours');
  });

  it('should use the `asFloat` option supplied', () => {
    try {
      Assert.dateDiffLessThanOrEqualTo(5, {
        asFloat: true,
        fromDate: new Date('1970-01-01 10:00:00Z'),
        unit: 'minutes'
      }).validate(new Date('1970-01-01 09:54:57Z'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.diff).toBe(5.05);
    }
  });

  it('should use the `unit` option supplied', () => {
    Assert.dateDiffLessThanOrEqualTo(2000, { fromDate: new Date('1970-01-01 10:00:00Z'), unit: 'seconds' }).validate(
      new Date('1970-01-01 09:55:55Z')
    );
  });

  it('should accept a date whose diff from `now` is equal to the threshold', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-31'));

    clock.restore();
  });

  it('should accept a date whose diff from `now` is less than the threshold', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000).validate(new Date('1969-12-31 11:00:00Z'));

    clock.restore();
  });

  it('should accept a date whose `absolute` diff from `now` is equal to the threshold', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-02'));

    clock.restore();
  });

  it('should accept a date whose `absolute` diff from `now` is less than the threshold', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    Assert.dateDiffLessThanOrEqualTo(24 * 60 * 60 * 1000, { absolute: true }).validate(
      new Date('1970-01-01 11:00:00Z')
    );

    clock.restore();
  });

  it('should accept a date whose diff from `fromDate` is equal to the threshold', () => {
    Assert.dateDiffLessThanOrEqualTo(24, { asFloat: false, fromDate: new Date('1970-01-01'), unit: 'hours' }).validate(
      new Date('1969-12-31')
    );
  });

  it('should accept a date whose diff from `fromDate` is less than the threshold', () => {
    Assert.dateDiffLessThanOrEqualTo(24, { asFloat: false, fromDate: new Date('1970-01-01'), unit: 'hours' }).validate(
      new Date('1969-12-31 11:00:00Z')
    );
  });

  it('should accept a date whose `absolute` diff from `fromDate` is equal to the threshold', () => {
    Assert.dateDiffLessThanOrEqualTo(24, {
      absolute: true,
      asFloat: false,
      fromDate: new Date('1970-01-01'),
      unit: 'hours'
    }).validate(new Date('1970-01-02'));
  });

  it('should accept a date whose `absolute` diff from `fromDate` is less than the threshold', () => {
    Assert.dateDiffLessThanOrEqualTo(24, {
      absolute: true,
      asFloat: false,
      fromDate: new Date('1970-01-01'),
      unit: 'hours'
    }).validate(new Date('1970-01-01 11:00:00Z'));
  });
});
