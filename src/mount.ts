import {
  TYPE_COMPONENT,
  TYPE_STRING,
  TYPE_ELEMENT
} from './constants';

import {
  Element
} from './element';

import {
  notNullOrUndefined,
  forKey,
  isFunction,
  eventKey,
  isString,
  isNumber,
  normalizeTextElement
} from './utils';

function mount(element: any, parentDom: HTMLElement) {
  if (isString(element) || isNumber(element)) {
    mount(normalizeTextElement(element) as any, parentDom);
  } else {
    try {
      if (element.flag === TYPE_STRING) {
        mountTextElement(element, parentDom);
      } else if (element.flag === TYPE_COMPONENT) {
        mountComponent(element, parentDom);
      } else if (element.flag === TYPE_ELEMENT) {
        mountElement(element, parentDom);
      } else {
        throw (`Element type has to be Component instance or string!`);
      }
    } catch (error) {
      console.error(error);
    }

  }
}

function mountComponent(element: any, parentDom: HTMLElement) {
  const instance = new element.type(element.props);

  if (isFunction(instance.componentWillMount)) {
    instance.componentWillMount();
  }
  const instanceElement = instance.render();

  instanceElement.dom = document
    .createElement(instanceElement.type as any);
  mountChildren(instanceElement);
  mountProps(instanceElement);
  parentDom.appendChild(instanceElement.dom);
  instance.setElement(instanceElement);
  element.instance = instance;
  if (isFunction(instance.componentDidMount)) {
    instance.componentDidMount();
  }
}

function mountElement(element: any, parentDom: HTMLElement) {
  element.dom = document
    .createElement(element.type as any);
  mountChildren(element);
  mountProps(element);
  parentDom
    .appendChild(element.dom as Node);
}

function mountTextElement(element: any, parentDom: HTMLElement) {
  element.dom = document.createTextNode(element.type);
  parentDom.appendChild(element.dom);
}

function mountChildren(element: Element) {
  element.props.children
    .filter(notNullOrUndefined)
    .forEach((child: any, index: string) => {
      if (isString(child) || isNumber(child)) {
        child = normalizeTextElement(child);
        element.props.children[index] = child;
      }
      mount(child, element.dom as any);
    });
}

function mountProps(element: any) {
  forKey(element.props, (key: string) => {
    mountProp(element.dom, key, element.props[key]);
  });
}

function mountProp(dom: HTMLElement, key: string, prop: any) {
  if (isFunction(prop)) {
    dom.addEventListener(eventKey(key), prop);
  } else if (key === 'className') {
    dom.setAttribute('class', prop);
  } else if (key !== 'children') {
    dom.setAttribute(key, prop);
  }
}

export {
  mount,
  mountProp
};