import {
  isArray,
  isFunction,
  isString
} from '../src/utils';

describe('isArray', () => {

  it('returns true if argument is Array', () => {
    expect(isArray([])).toEqual(true);
  });

  it('returns false if argument is not Array', () => {
    expect(isArray('')).toEqual(false);
  });
});

describe('isFunction', () => {

  it('returns true if argument is Function', () => {
    expect(isFunction(() => {})).toEqual(true);
  });

  it('returns false if argument is not Function', () => {
    expect(isFunction('')).toEqual(false);
  });
});

describe('isString', () => {

  it('returns true if argument is String', () => {
    expect(isString('')).toEqual(true);
  });

  it('returns false if argument is not String', () => {
    expect(isString(0)).toEqual(false);
  });
});