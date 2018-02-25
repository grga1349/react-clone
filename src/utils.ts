import { TYPE_STRING } from './constants';

function isArray(arg: any) {
  return Array.isArray(arg);
}

function isObject(arg: any) {
  return arg instanceof Object;
}

function isString(arg: any) {
  return typeof arg === 'string';
}

function isFunction(arg: any) {
  return typeof arg === 'function';
}

function isNumber(arg: any) {
  return typeof arg === 'number';
}

function forKey(arg: any, callback: (key: any, index: number) => void) {
  Object.keys(arg).forEach(callback);
}

function flattenArray(args: Array<any>) {
  return [].concat.apply([], args);
}

function nullOrUndefined(arg: any) {
  return arg === undefined || arg == null;
}

function eventKey(key: string) {
  return key
    .substring(2)
    .toLowerCase();
}

function normalizeTextElement(element: any) {
  return {
    type: element,
    flag: TYPE_STRING
  };
}

function onlyUniquePropKeys(prevProps: any, nextProps: any) {
  return Object.keys(
    {...prevProps, ...nextProps}
  );
}

function shouldNormalize(element: any) {
  return isString(element) || isNumber(element);
}

export {
  isArray,
  isObject,
  isString,
  isNumber,
  isFunction,
  forKey,
  flattenArray,
  nullOrUndefined,
  eventKey,
  normalizeTextElement,
  shouldNormalize,
  onlyUniquePropKeys
};
