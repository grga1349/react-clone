import { Element } from './element';
import { nullOrUndefined, } from './utils';
import { mount } from './mount';

function render(element: Element, parentDom: HTMLElement | null) {
  if (nullOrUndefined(element)) {
    console.error(`JSX Element can't be null or undefined!`);
  }

  if (nullOrUndefined(parentDom)) {
    console.error(`Parent DOM Element can't be null or undefined!`);
  }

  mount(element, parentDom as HTMLElement);
}

export {
  render,
};
