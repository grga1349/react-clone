import {
  TYPE_COMPONENT,
} from './constants';

import {
  Element
} from './element';

import {
  update
} from './update';

import {
  unmount
} from './unmount';

import {
  notNullOrUndefined
} from './utils';

abstract class Component <Props, State> {

  static flag: string = TYPE_COMPONENT;
  public props: Props;
  public state: State;
  public element: Element;

  constructor(props: Props) {
    this.props = props;
  }

  public componentWillMount?(): void;
  public componentDidMount?(): void;

  public setState(partialState: Object) {
    this.updateComponent(
      null as any,
      {
        ...this.state as Object,
        ...partialState
      } as any
    );
  }

  public componentWillReciveProps?(props: Props): void;

  public updateComponent(props: Props, state: State) {
    if (notNullOrUndefined(props)) {
      this.componentWillReciveProps
        && this.componentWillReciveProps(props as any);
      this.props = props;
    }
    if (notNullOrUndefined(state)) {
      this.state = state;
    }
    const parentElement = this.element.dom
      && this.element.dom.parentElement;
    update(
      parentElement as any,
      this.element,
      this.render()
    );
  }

  public abstract render(): any;

  public setElement(element: Element) {
    this.element = element;
  }

  public componentWillUnmount?(): void;

  public unmountSelf() {
    this.componentWillUnmount
      && this.componentWillUnmount();
    const parentElement = this.element.dom
      && this.element.dom.parentElement;
    unmount(this.element, parentElement as any);
  }

}

export {
  Component
};