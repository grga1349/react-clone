import { TYPE_COMPONENT } from './constants';
import { isFunction, eventKey } from './utils';

function unmount(element: any, parentDom: HTMLElement) {
  if (element.flag === TYPE_COMPONENT) {
    unmountComponent(element);
  } else {
    unmountOther(element, parentDom);
  }
}

function unmountComponent(element: any) {
  element.instance.unmountSelf();
  element = null;
}

function unmountOther(element: any, parentDom: HTMLElement) {
  console.log('ELEMENT: ', element);
  parentDom.removeChild(element.dom);
}

function unmountProp(dom: HTMLElement, key: string, prop: any) {
  if (isFunction(prop)) {
    dom.removeEventListener(eventKey(key), prop);
  } else if (key === 'className') {
    dom.removeAttribute('class');
  } else if (key !== 'children') {
    dom.removeAttribute(key);
  }
}

export {
  unmount,
  unmountProp
};
