# validator.js-asserts
A set of extra asserts for [validator.js](https://github.com/guillaumepotier/validator.js).

## Status
[![npm version][npm-image]][npm-url] [![build status][travis-image]][travis-url]

## Installation
Install the package via `npm`:

```sh
$ npm install --save validator.js-asserts
```

### Peer dependencies
Some asserts require manually installing some _peer dependencies_. Failing to do so will result in runtime errors, as packages are required dynamically.

Peer dependencies are not listed on `package.json` because npm 2 considers them _mandatory peer dependencies_ and, therefore, always installs them, while [npm 3](https://github.com/npm/npm/blob/master/CHANGELOG.md#peerdependencies) follows a more consensual approach of _optional peer dependencies_, not installing them by default but generating warning and confusing error messages instead.

You should pin these package's peer dependencies to the ranges listed on the _optionalPeerDependencies_ key of this package's manifest.

## Asserts
The following set of extra asserts are provided by this package:
- [AbaRoutingNumber](#abaroutingnumber) (requires `abavalidator`)
- [BankIdentifierCode](#bankidentifiercode-bic) (_BIC_)
- [BigNumber](#bignumber) (requires `bignumber.js`)
- [BigNumberEqualTo](#bignumberequalto) (requires `bignumber.js`)
- [BigNumberGreaterThan](#bignumbergreaterthan) (requires `bignumber.js`)
- [BigNumberGreaterThanOrEqualTo](#bignumbergreaterthanorequalto) (requires `bignumber.js`)
- [BigNumberLessThan](#bignumberlessthan) (requires `bignumber.js`)
- [BigNumberLessThanOrEqualTo](#bignumberlessthanorequalto) (requires `bignumber.js`)
- [Boolean](#boolean)
- [CreditCard](#creditcard) (requires `creditcard`)
- [Date](#date) (requires `moment` for format validation only)
- [DateDiffGreaterThan](#datediffgreaterthan) (requires `moment`)
- [DateDiffGreaterThanOrEqualTo](#datediffgreaterthanorequalto) (requires `moment`)
- [DateDiffLessThan](#datedifflessthan) (requires `moment`)
- [DateDiffLessThanOrEqualTo](#datedifflessthanorequalto) (requires `moment`)
- [Email](#email) (requires `validator`)
- [EqualKeys](#equalkeys)
- [Hash](#hash)
- [Integer](#integer)
- [InternationalBankAccountNumber](#internationalbankaccountnumber-iban) (_IBAN_, requires `iban`)
- [Ip](#ip)
- [Iso3166Country](#iso3166country) (requires `isoc`)
- [Json](#json)
- [NotEmpty](#notempty)
- [NullOr](#nullor)
- [NullOrDate](#nullordate)
- [NullOrString](#nullorstring)
- [Phone](#phone) (requires `google-libphonenumber`)
- [PlainObject](#plainobject)
- [TaxpayerIdentificationNumber](#taxpayeridentificationnumber) (_TIN_, requires `tin-validator`)
- [UkModulusChecking](#ukmoduluschecking) (requires `uk-modulus-checking`)
- [Uri](#uri) (requires `urijs`)
- [UsSubdivision](#ussubdivision)
- [UsZipCode](#uszipcode)
- [Uuid](#uuid)

### AbaRoutingNumber
Tests if the value is a valid [ABA Routing Number](http://www.accuity.com/PageFiles/255/ROUTING_NUMBER_POLICY.pdf).

### BankIdentifierCode (*BIC*)
Tests if the value is a valid Bank Identifier Code (_BIC_) as defined in the [ISO-9362](http://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=60390) standard.

### BigNumber
Tests if the value is a valid `BigNumber`.

### BigNumberEqualTo
Tests if a `BigNumber` is equal to a given value.

#### Arguments
- `value` (required)

### BigNumberGreaterThan
Tests if a `BigNumber` is greater than a given threshold.

#### Arguments
- `threshold` (required)

### BigNumberGreaterThanOrEqualTo
Tests if a `BigNumber` is greater than or equal to a given threshold.

#### Arguments
- `threshold` (required)

### BigNumberLessThan
Tests if a `BigNumber` is less than a given threshold.

#### Arguments
- `threshold` (required)

### BigNumberLessThanOrEqualTo
Tests if a `BigNumber` is less than or equal to a given threshold.

#### Arguments
- `threshold` (required)

### Boolean
Tests if the value is a boolean.

### CreditCard
Tests if the value is a valid credit card number using the Luhn10 algorithm.

### Date
Tests if the value is a valid date.

#### Arguments
- `format` (optional) - the format in which the date must be in.

### DateDiffGreaterThan
Tests if the difference between two dates is greater than a given threshold.

#### Arguments
- `threshold` (required)
- `options`
  - `absolute` - whether the comparison should use the absolute value of the measured difference.
  - `asFloat` - whether to return the difference rounded down or as float.
  - `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
  - `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### DateDiffGreaterThanOrEqualTo
Tests if the difference between two dates is greater than or equal to a given threshold.

#### Arguments
- `threshold` (required)
- `options`
  - `absolute` - whether the comparison should use the absolute value of the measured difference.
  - `asFloat` - whether to return the difference rounded down or as float.
  - `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
  - `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### DateDiffLessThan
Tests if the difference between two dates is less than a given threshold.

#### Arguments
- `threshold` (required)
- `options`
  - `absolute` - whether the comparison should use the absolute value of the measured difference.
  - `asFloat` - whether to return the difference rounded down or as float.
  - `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
  - `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### DateDiffLessThanOrEqualTo
Tests if the difference between two dates is less than or equal to a given threshold.

#### Arguments
- `threshold` (required)
- `options`
  - `absolute` - whether the comparison should use the absolute value of the measured difference.
  - `asFloat` - whether to return the difference rounded down or as float.
  - `fromDate` - the date where the diff is measured with. If omitted, defaults to `now`.
  - `unit` - the unit of the difference measurement (`years`, `months`, `weeks`, `days`, `hours`, `minutes` and `seconds`).

### Email
Tests if the value is a valid email.

### EqualKeys
Tests if the object has the exact given set of keys (missing or extra keys are not allowed).

#### Arguments
- `keys` (optional) - the keys that the object being tested must equal. If none are defined, no keys will be allowed.

### Hash
Tests if the value is a valid hash.

#### Arguments
- `algorithm` (required) - the algorithm to test the hash for. Supported algorithms are `sha1`, `sha256` and `sha512`.

### Integer
Tests if the value is an integer.

### InternationalBankAccountNumber (*IBAN*)
Tests if the value is a valid International Bank Account Number (_IBAN_) as defined in the [13616-1](http://www.iso.org/iso/iso_catalogue/catalogue_tc/catalogue_detail.htm?csnumber=41031) standard.

### Ip
Tests if the value is a valid ip (v4 or v6).

### Iso3166Country
Tests if the value is a valid ISO-3166 country by alpha-3 code, alpha-2 code, short name or uppercase name. All officially-assigned, transitionally-assigned and user-assigned codes are considered valid.

### Json
Tests if the value is valid json.

### NotEmpty
Tests if the value is not an empty (empty object, empty array, empty string, etc).

### NullOr

Takes another assert as an argument to make that assert nullable.

### NullOrString
Tests if the value is a `null` or `string`, optionally within some boundaries.

#### Arguments
- `boundaries` (optional) - `max` and/or `min` boundaries to test the string for.

### Phone
Tests if the phone is valid and optionally if it belongs to the given country. The phone can be in the national or E164 formats.

#### Arguments
- `countryCode` (optional) - the ISO-3166 alpha-2 country code to test the phone validity in.

### PlainObject
Tests if the value is a plain object.

### TaxpayerIdentificationNumber
Tests if the value is a valid Taxpayer Identification Number (_TIN_) as defined by the [U.S. IRS](http://www.irs.gov/Individuals/International-Taxpayers/Taxpayer-Identification-Numbers-TIN).

### UkModulusChecking
Tests if the given `accountNumber` and `sortCode` represent a valid `Faster Payment Account`.

### Uri
Tests if the value is a valid `uri` which must contain at least a protocol and a hostname.

#### Arguments
- `constraints` (optional) - additional uri parts to test for (e.g. `{ is: 'domain', protocol: 'https' }`).

### UsSubdivision
Tests if the value is a valid US subdivision or not. By default, codes in the short ("alpha2", e.g. `CA`) or full form (e.g. `US-CA`) are allowed. All US subdivisions categories are supported: `districts` (1), `states` (50) and `outlying` territories (6).

#### Arguments
- `alpha2Only` (optional) - whether to restrict validation to the "alpha2" short code form only.
- `categories` (optional) - a list of categories to restrict code validation to (e.g. `['states', 'outlying']`).

### UsZipCode
Tests if the value is a valid US zip code.

### Uuid
Tests if the value is a valid uuid.

#### Arguments
- `version` (optional) - the version to test the uuid for. Supported version are `3`, `4` and `5`. Defaults to test for `all` three if omitted.

## Usage
The following is an example for the extra ip assert:

```js
const Validator = require('validator.js').Validator;
const is = require('validator.js').Assert.extend(require('validator.js-asserts'));
const validator = new Validator();

// Validate ip `1.3.3.7`.
let violation = validator.validate('1.3.3.7', is.ip());

if (true === violation) {
  console.log('"1.3.3.7" is a valid IP'); // => "1.3.3.7" is a valid IP
}

// Validate ip `foo`.
violation = validator.validate('foo', is.ip());

if (true !== violation) {
  console.log('"foo" is not a valid IP. Violation:', violation[0].show());
  // => "foo" is not a valid IP. Violation: { assert: 'Ip', value: 'foo' }
}

// Make the validation nullable.
violation = validator.validate(null, is.nullOr(is.ip()));

if (true === violation) {
  console.log('null is null or a valid IP'); // => null is null or a valid IP
}
```

## Tests

```sh
$ npm test
```

## Release

```sh
npm version [<newversion> | major | minor | patch] -m "Release %s"
```

## License
MIT

[npm-image]: https://img.shields.io/npm/v/validator.js-asserts.svg?style=flat-square
[npm-url]: https://npmjs.org/package/validator.js-asserts
[travis-image]: https://img.shields.io/travis/uphold/validator.js-asserts.svg?style=flat-square
[travis-url]: https://travis-ci.org/uphold/validator.js-asserts
