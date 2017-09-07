import {
  Element
} from './element';

import {
  notNullOrUndefined,
} from './utils';

import {
  mount
} from './mount';

function render(element: Element, parentDom: HTMLElement | null) {
  try {
    if (!notNullOrUndefined(element)) {
      throw(`JSX Element can't be null or undefined!`);
    }
    if (!notNullOrUndefined(parentDom)) {
      throw(`Parent DOM Element can't be null or undefined!`);
    }
    mount(element, parentDom as HTMLElement);
  } catch (error) {
    console.error(error);
  }
}

export {
  render,
};