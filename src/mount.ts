import {
  isFunction,
  eventKey,
  shouldNormalize,
  normalizeTextElement
} from './utils';
import { TYPE_COMPONENT, TYPE_STRING, TYPE_ELEMENT } from './constants';
import { Element } from './element';


function mount(element: any, parentDom: HTMLElement) {
  if (shouldNormalize(element)) {
    mount(normalizeTextElement(element) as any, parentDom);
    return;
  }

  if (element.flag === TYPE_STRING) {
    mountTextElement(element, parentDom);
    return;
  }

  if (element.flag === TYPE_COMPONENT) {
    mountComponent(element, parentDom);
    return;
  }

  if (element.flag === TYPE_ELEMENT) {
    mountElement(element, parentDom);
    return;
  }

  console.error(`Element type has to be Component instance or string!`);
}

function mountComponent(element: any, parentDom: HTMLElement) {
  const instance = new element.type(element.props);

  if (isFunction(instance.componentWillMount)) {
    instance.componentWillMount();
  }

  const instanceElement = instance.render();

  instanceElement.dom = document.createElement(instanceElement.type as any);

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
  element.dom = document .createElement(element.type as any);

  mountChildren(element);
  mountProps(element);
  parentDom.appendChild(element.dom as Node);
}

function mountTextElement(element: any, parentDom: HTMLElement) {
  element.dom = document.createTextNode(element.type);
  parentDom.appendChild(element.dom);
}

function mountChildren(element: Element) {
  for (let key in element.props.children) {
    if (shouldNormalize(element.props.children[key])) {
      element.props.children[key] = normalizeTextElement(
        element.props.children[key]
      );
    }

    mount(element.props.children[key], element.dom as any);
  }
}

function mountProps(element: any) {
  for (let key in element.props) {
    mountProp(element.dom, key, element.props[key]);
  }
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
