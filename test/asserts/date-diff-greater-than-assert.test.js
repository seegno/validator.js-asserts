'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Violation } = require('validator.js');
const DateDiffGreaterThanAssert = require('../../src/asserts/date-diff-greater-than-assert');
const sinon = require('sinon');

/**
 * Extend `Assert` with `DateDiffGreaterThanAssert`.
 */

const Assert = BaseAssert.extend({
  DateDiffGreaterThan: DateDiffGreaterThanAssert
});

/**
 * Test `DateDiffGreaterThanAssert`.
 */

describe('DateDiffGreaterThanAssert', () => {
  it('should throw an error if `threshold` is missing', () => {
    try {
      Assert.dateDiffGreaterThan();

      fail();
    } catch (e) {
      expect(e.message).toBe('A threshold value is required.');
    }
  });

  it('should have a default option `absolute` of `false`', () => {
    const assert = Assert.dateDiffGreaterThan(1);

    expect(assert.options.absolute).toBe(false);
  });

  it('should have a default option `asFloat` of `false`', () => {
    const assert = Assert.dateDiffGreaterThan(1);

    expect(assert.options.asFloat).toBe(false);
  });

  it('should have a default option `fromDate` of `null`', () => {
    const assert = Assert.dateDiffGreaterThan(1);

    expect(assert.options.fromDate).toBeNull();
  });

  it('should have a default option `unit` of `milliseconds`', () => {
    const assert = Assert.dateDiffGreaterThan(1);

    expect(assert.options.unit).toBe('milliseconds');
  });

  it('should throw an error if the input value is not a date', () => {
    const choices = [[], {}];

    choices.forEach(choice => {
      try {
        Assert.dateDiffGreaterThan(10).validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe('must_be_a_date_or_a_string');
      }
    });
  });

  it('should throw an error if the input value is not a valid date', () => {
    try {
      Assert.dateDiffGreaterThan(10).validate('2015-99-01');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().value).toBe('2015-99-01');
    }
  });

  it('should throw an error if the diff between `now` and input date is equal to `threshold`', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    try {
      Assert.dateDiffGreaterThan(0).validate(new Date('1970-01-01'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).toBe(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the `absolute` diff between `now` and input date is equal to `threshold`', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    try {
      Assert.dateDiffGreaterThan(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-02'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).toBe(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is equal to `threshold`', () => {
    try {
      Assert.dateDiffGreaterThan(0, { fromDate: new Date('1970-01-01') }).validate(new Date('1970-01-01'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).toBe(e.show().violation.diff);
    }
  });

  it('should throw an error if the `absolute` diff between `fromDate` and input date is equal to `threshold`', () => {
    try {
      Assert.dateDiffGreaterThan(24 * 60 * 60 * 1000, { absolute: true, fromDate: new Date('1970-01-01') }).validate(
        new Date('1970-01-02')
      );

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).toBe(e.show().violation.diff);
    }
  });

  it('should throw an error if the diff between `now` and input date is less than the `threshold`', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    try {
      Assert.dateDiffGreaterThan(24 * 60 * 60 * 1000).validate(new Date('1970-01-01'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).not.toBe(e.show().violation.diff);
    }

    clock.restore();
  });

  it('should throw an error if the diff between `fromDate` and input date is less than the `threshold`', () => {
    try {
      Assert.dateDiffGreaterThan(24 * 60 * 60 * 1000, { fromDate: new Date('1970-01-01') }).validate(
        new Date('1970-01-01 10:00:00Z')
      );

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.threshold).not.toBe(e.show().violation.diff);
    }
  });

  it('should expose `assert` equal to `DateDiffGreaterThanAssert`', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    try {
      Assert.dateDiffGreaterThan(24 * 60 * 60 * 1000).validate(new Date('1970-01-01'));

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('DateDiffGreaterThan');
    }

    clock.restore();
  });

  it('should expose `absolute`, `asFloat`, `diff`, `fromDate`, `threshold` and `unit` on the violation', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    try {
      Assert.dateDiffGreaterThan(24 * 60 * 60 * 1000).validate(new Date('1970-01-01'));

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
    const assert = Assert.dateDiffGreaterThan(0, { asFloat: true });

    expect(assert.options.asFloat).toBe(true);
  });

  it('should accept option `fromDate`', () => {
    const assert = Assert.dateDiffGreaterThan(0, { fromDate: new Date('1970-01-01') });

    expect(assert.options.fromDate).toEqual(new Date('1970-01-01'));
  });

  it('should accept option `unit`', () => {
    const assert = Assert.dateDiffGreaterThan(24, { unit: 'hours' });

    expect(assert.options.unit).toBe('hours');
  });

  it('should use the `asFloat` option supplied', () => {
    try {
      Assert.dateDiffGreaterThan(5, {
        asFloat: true,
        fromDate: new Date('1970-01-01 10:00:00Z'),
        unit: 'minutes'
      }).validate(new Date('1970-01-01 10:04:51Z'));

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
      expect(e.show().violation.diff).toBe(-4.85);
    }
  });

  it('should use the `unit` option supplied', () => {
    try {
      Assert.dateDiffGreaterThan(2000, { fromDate: new Date('1970-01-01 10:00:00Z'), unit: 'seconds' }).validate(
        new Date('1970-01-01 10:00:05Z')
      );

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
    }
  });

  it('should accept a date whose diff from `now` is greater than the threshold', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    Assert.dateDiffGreaterThan(24 * 60 * 60 * 1000).validate(new Date('1969-12-30'));

    clock.restore();
  });

  it('should accept a date whose `absolute` diff from `now` is greater than the threshold', () => {
    const clock = sinon.useFakeTimers({ now: 0, toFake: ['Date'] });

    Assert.dateDiffGreaterThan(24 * 60 * 60 * 1000, { absolute: true }).validate(new Date('1970-01-03'));

    clock.restore();
  });

  it('should accept a date whose diff from `fromDate` is greater than the threshold', () => {
    Assert.dateDiffGreaterThan(24, { asFloat: false, fromDate: new Date('1970-01-01'), unit: 'hours' }).validate(
      new Date('1969-12-30')
    );
  });

  it('should accept a date whose `absolute` diff from `fromDate` is greater than the threshold', () => {
    Assert.dateDiffGreaterThan(24, {
      absolute: true,
      asFloat: false,
      fromDate: new Date('1969-12-30'),
      unit: 'hours'
    }).validate(new Date('1970-01-01'));
  });
});
