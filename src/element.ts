import { flattenArray, isString, nullOrUndefined } from './utils';
import { TYPE_ELEMENT } from './constants';

interface Element {
  type: string | Function;
  props: any;
  flag: string;
  dom: HTMLElement | null;
  instance: null;
}

// Dark magic that prevents ts errors when using JSX elements.
type VElement = Element;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [type: string]: any;
    }
    interface Element extends VElement {
      [type: string]: any;
    }
  }
}

function filterChildren(child: any) {
  return !nullOrUndefined(child);
}

function mergeChildrenAndProps(options: any, args: Array<any>) {
  return {
    ...options,
    children: flattenArray(args).filter(filterChildren)
  };
}

function setElementFlag(type: any) {
  if (isString(type)) {
    return TYPE_ELEMENT;
  }

  return type.flag;
}

function createElement(
  type: any,
  options: any,
  ...args: Array<any>
): Element {

  return {
    type,
    props: mergeChildrenAndProps(options, args),
    flag: setElementFlag(type),
    dom: null,
    instance: null
  };
}

export {
  createElement,
  Element
};
