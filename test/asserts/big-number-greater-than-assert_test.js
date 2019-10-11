
/**
 * Module dependencies.
 */

const BigNumber = require('bignumber.js');
const BigNumberGreaterThanAssert = require('../../src/asserts/big-number-greater-than-assert');
const should = require('should');
const { Assert: BaseAssert, Violation } = require('validator.js');

/**
 * Extend `Assert` with `BigNumberGreaterThanAssert`.
 */

const Assert = BaseAssert.extend({
  BigNumberGreaterThan: BigNumberGreaterThanAssert
});

/**
 * Test `BigNumberGreaterThanAssert`.
 */

describe('BigNumberGreaterThanAssert', () => {
  it('should throw an error if `threshold` is missing', () => {
    try {
      new Assert().BigNumberGreaterThan();

      should.fail();
    } catch (e) {
      e.message.should.equal('A threshold value is required.');
    }
  });

  [undefined, { validateSignificantDigits: true }, { validateSignificantDigits: false }].forEach(option => {
    describe(`with option '${option ? `{ validateSignificantDigits: ${option.validateSignificantDigits} }` : undefined }'`, () => {
      it('should throw an error if `threshold` is not a number', () => {
        try {
          new Assert().BigNumberGreaterThan({}, option);

          should.fail();
        } catch (e) {
          e.should.be.instanceOf(Violation);
          e.show().violation.message.should.match(/Not a number/);
        }
      });

      it('should throw an error if the input value is not a number', () => {
        const choices = [[], {}, ''];

        choices.forEach(choice => {
          try {
            new Assert().BigNumberGreaterThan(10, option).validate(choice);

            should.fail();
          } catch (e) {
            e.should.be.instanceOf(Violation);
          }
        });
      });

      it('should throw an error if the input number is equal to threshold', () => {
        try {
          new Assert().BigNumberGreaterThan(10, option).validate(10);

          should.fail();
        } catch (e) {
          e.should.be.instanceOf(Violation);
        }
      });

      it('should throw an error if the input number is less than the threshold', () => {
        try {
          new Assert().BigNumberGreaterThan(10, option).validate(9.99999999);

          should.fail();
        } catch (e) {
          e.should.be.instanceOf(Violation);
        }
      });

      it('should expose `assert` equal to `BigNumberGreaterThan`', () => {
        try {
          new Assert().BigNumberGreaterThan(1, option).validate(0.1);

          should.fail();
        } catch (e) {
          e.show().assert.should.equal('BigNumberGreaterThan');
        }
      });

      it('should expose `message` on the violation if the input value is not a number', () => {
        try {
          new Assert().BigNumberGreaterThan(10, option).validate({});

          should.fail();
        } catch (e) {
          e.show().violation.message.should.match(/Not a number/);
        }
      });

      it('should expose `threshold` on the violation', () => {
        try {
          new Assert().BigNumberGreaterThan(10, option).validate(0.1);

          should.fail();
        } catch (e) {
          e.show().violation.threshold.should.equal('10');
        }
      });

      it('should accept a big number as a `threshold` value', () => {
        new Assert().BigNumberGreaterThan(new BigNumber(10), option).validate(10.00000001);
      });

      it('should accept a number that is greater than threshold', () => {
        new Assert().BigNumberGreaterThan(10, option).validate(10.00000001);
      });
    });
  });
});
