import {
  Element
} from './element';

import {
  TYPE_COMPONENT,
  TYPE_STRING,
  TYPE_ELEMENT
} from './constants';

import {
  isString,
  isNumber,
  isFunction,
  normalizeTextElement,
  onlyUniquePropKeys,
  notNullOrUndefined
} from './utils';

import {
  mount,
  mountProp
} from './mount';

import {
  unmount,
  unmountProp
} from './unmount';

function update(
  parentDom: HTMLElement,
  prevElement: Element,
  nextElement: Element
) {
  if (isString(nextElement) || isNumber(nextElement)) {
    update(parentDom, prevElement, normalizeTextElement(nextElement) as any);
  } else {
    if (prevElement !== nextElement) {
      try {
        if (nextElement.flag === TYPE_STRING) {
          if (prevElement.flag === TYPE_STRING) {
            patchTextElement(prevElement, nextElement);
          } else {
            replace(parentDom, prevElement, nextElement);
          }
        } else if (nextElement.flag === TYPE_COMPONENT) {
          console.log('updating component');
          if (prevElement.flag === TYPE_COMPONENT) {
            patchComponent(parentDom, prevElement, nextElement);
          } else {
            replace(parentDom, prevElement, nextElement);
          }
        } else if (nextElement.flag === TYPE_ELEMENT) {
          if (prevElement.flag === TYPE_ELEMENT) {
            patchElement(parentDom, prevElement, nextElement);
          } else {
            replace(parentDom, prevElement, nextElement);
          }
        } else {
          throw(`Element type has to be Component instance or string!`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

function replace(
  parentDom: HTMLElement,
  prevElement: Element,
  nextElement: Element
) {
  if (!notNullOrUndefined(prevElement)) {
    mount(nextElement, parentDom);
  } else if (!notNullOrUndefined(nextElement)) {
    unmount(prevElement, parentDom);
  } else {
    unmount(prevElement, parentDom);
    mount(nextElement, parentDom);
  }
  prevElement = nextElement;
}

function patchTextElement(
  prevElement: any,
  nextElement: Element
) {
  prevElement.dom.nodeValue = nextElement.type as string;
  prevElement = Object.assign({}, prevElement, nextElement);
}

function patchComponent(
  parentDom: HTMLElement,
  prevElement: any,
  nextElement: Element
) {
  if (nextElement.type.constructor !== prevElement.type.constructor) {
    replace(parentDom, prevElement, nextElement);
  } else {
    prevElement.instance.updateComponent(nextElement.props, null);
  }
}

function patchElement(
  parentDom: HTMLElement,
  prevElement: Element,
  nextElement: Element
) {
  if (nextElement.type !== prevElement.type) {
    replace(parentDom, prevElement, nextElement);
  } else {
    patchProps(prevElement.dom as HTMLElement, prevElement, nextElement);
    patchChildren(prevElement.dom as HTMLElement, prevElement, nextElement);
    nextElement.dom = prevElement.dom;
    prevElement = nextElement;
  }
}

function patchProps(
  parentDom: HTMLElement,
  prevElement: Element,
  nextElement: Element
) {
  const propKeys = onlyUniquePropKeys(
    prevElement.props,
    nextElement.props
  );

  propKeys.forEach((key: string) => {
    const areEqual = arePropsEqual(
      prevElement.props[key],
      nextElement.props[key]
    );
    const isPrev = notNullOrUndefined(prevElement.props[key]);
    const isNext = notNullOrUndefined(nextElement.props[key]);
    const isNextFunction = isFunction(nextElement.props[key]);

    if ((!isPrev && isNext)) {
      mountProp(parentDom, key, nextElement.props[key]);
    } else if (isPrev && !isNext) {
      unmountProp(parentDom, key, prevElement.props[key]);
    } else if (isNextFunction || !areEqual) {
      unmountProp(parentDom, key, prevElement.props[key]);
      mountProp(parentDom, key, nextElement.props[key]);
    }
  });
}

function arePropsEqual(prevProp: any, nextProp: any) {
  return prevProp === nextProp;
}

function patchChildren(
  parentDom: HTMLElement,
  prevElement: Element,
  nextElement: Element
) {
  const max = Math.max(
    prevElement.props.children.length,
    nextElement.props.children.length
  );

  for (let i = 0; i < max; i ++) {
    const isPrev = notNullOrUndefined(prevElement.props.children[i]);
    const isNext = notNullOrUndefined(nextElement.props.children[i]);

    if (isPrev && isNext) {
      update(
        parentDom,
        prevElement.props.children[i],
        nextElement.props.children[i]
      );
    } else if (isPrev && !isNext) {
      unmount(
        prevElement.props.children[i],
        parentDom
      );
      prevElement.props.children[i] = nextElement.props.children[i];
    } else if (!isPrev && isNext) {
      mount(
        nextElement.props.children[i],
        parentDom
      );
      prevElement.props.children[i] = nextElement.props.children[i];
    }
  }
}

export {
  update
};