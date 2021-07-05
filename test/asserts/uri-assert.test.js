'use strict';

/**
 * Module dependencies.
 */

const { Assert: BaseAssert, Validator, Violation } = require('validator.js');
const UriAssert = require('../../src/asserts/uri-assert');

/**
 * Extend `Assert` with `UriAssert`.
 */

const Assert = BaseAssert.extend({
  Uri: UriAssert
});

/**
 * Test `UriAssert`.
 */

describe('UriAssert', () => {
  it('should throw an error if the constraint is invalid', () => {
    try {
      Assert.uri({ foo: 'bar' });

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Invalid constraint "foo=bar"');
    }
  });

  it('should throw an error if the input value is not a string', () => {
    const choices = [[], {}, 123];

    choices.forEach(choice => {
      try {
        Assert.uri().validate(choice);

        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Violation);
        expect(e.violation.value).toBe(Validator.errorCode.must_be_a_string);
      }
    });
  });

  it('should throw an error if the uri does not contain a `hostname`', () => {
    try {
      Assert.uri().validate(`foo-${'-'.repeat(246)}-bar`);

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not contain a `protocol`', () => {
    try {
      Assert.uri().validate('foobar.com');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not match the constraints', () => {
    try {
      Assert.uri({ protocol: 'http' }).validate(`https://${'-'.repeat(246)}@bar.com`);

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
    }
  });

  it('should throw an error if the uri does not match the `is` constraint', () => {
    try {
      Assert.uri({ is: 'ip' }).validate('https://foobar.com');

      fail();
    } catch (e) {
      expect(e).toBeInstanceOf(Violation);
    }
  });

  it('should expose `constraints` on the violation', () => {
    try {
      Assert.uri({ protocol: 'http' }).validate('https://foobar.com');

      fail();
    } catch (e) {
      expect(e.show().violation.constraints).toEqual({ protocol: 'http' });
    }
  });

  it('should expose `assert` equal to `Uri`', () => {
    try {
      Assert.uri().validate('foo');

      fail();
    } catch (e) {
      expect(e.show().assert).toBe('Uri');
    }
  });

  it('should accept an `is` constraint without a hostname or protocol', () => {
    Assert.uri({ is: 'relative' }).validate('/dashboard');
  });

  it('should accept an uri that matches the constraints', () => {
    Assert.uri({ is: 'domain' }).validate('https://foobar.com');
    Assert.uri({ protocol: 'https' }).validate('https://foobar.com');
  });

  it('should accept valid uris', () => {
    [
      'http://foobar.com',
      'http://føøbåz.com',
      'http://foobar.com',
      'https://foobar.com',
      'ftp://foobar.com',
      'biz://foobar.com'
    ].forEach(choice => {
      Assert.uri().validate(choice);
    });
  });
});
