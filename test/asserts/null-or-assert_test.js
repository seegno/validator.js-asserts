
/**
 * Module dependencies.
 */

import asserts from '../../src/index';
import should from 'should';
import { Assert as BaseAssert, Validator, Violation } from 'validator.js';

/**
 * Extend `Assert` with `NullOrAssert`.
 */

const Assert = BaseAssert.extend(asserts);

/**
 * Test `NullOrAssert`.
 */

describe('NullOrAssert', () => {
  it('should throw an error if the specified assert is not valid', () => {
    try {
      new Assert.NullOr('foo').validate('bar');

      should.fail();
    } catch (e) {
      e.message.should.equal('Assert must be an object.');
    }
  });

  it('should throw an error if the specified assert has no `validate` function', () => {
    try {
      new Assert.NullOr({}).validate(123);

      should.fail();
    } catch (e) {
      e.message.should.equal('Assert must have a validate function.');
    }
  });

  it('should throw an error if the specified assert has a `validate` that is not a function', () => {
    try {
      new Assert.NullOr({ validate: true }).validate(123);

      should.fail();
    } catch (e) {
      e.message.should.equal('Assert must have a validate function.');
    }
  });

  it('should throw an error if the value is not null and is not valid for the specified assert', () => {
    try {
      new Assert.NullOr(Assert.String()).validate(123);

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().assert.should.equal('IsString');
    }
  });

  it('should include the arguments of the specified assert', () => {
    try {
      new Assert.NullOr(Assert.Uuid(4)).validate('foobar');

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(Violation);
      e.show().violation.version.should.equal(4);
    }
  });

  it('should accept a null value', () => {
    new Assert.NullOr(Assert.String()).validate(null);
  });

  it('should accept a value that is valid for the specified assert', () => {
    new Assert.NullOr(Assert.String()).validate('foobar');
  });
});
