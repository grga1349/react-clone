import {
  flattenArray,
  isString,
  notNullOrUndefined
} from './utils';

import {
  TYPE_ELEMENT
} from './constants';

interface Element {
  type: string | Function;
  props: any;
  flag: string;
  dom: HTMLElement | null;
  instance: null;
}

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

function createElement(type: any,
  options: any, ...args: Array<any>
): Element {
  const props = {
    ...options,
    children: flattenArray(args).filter(notNullOrUndefined)
  };
  const flag = type.flag || (isString(type) && TYPE_ELEMENT);

  return {
    type,
    props,
    flag,
    dom: null,
    instance: null
  };
}

export {
  createElement,
  Element
};