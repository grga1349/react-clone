import { TYPE_COMPONENT } from './constants';
import { Element } from './element';
import { update } from './update';
import { unmount } from './unmount';
import { nullOrUndefined, isFunction } from './utils';

abstract class Component <Props, State> {

  static readonly flag: string = TYPE_COMPONENT;
  public props: Props;
  public state: State;
  public element: Element;
  public componentWillMount?(): void;
  public componentDidMount?(): void;
  public abstract render(): any;

  constructor(props: Props) {
    this.props = props;
  }

  public setState(partialState: Object) {
    console.log('STATE: ', this.state);
    this.updateComponent(
      null as any,
      {
        ...this.state as Object,
        ...partialState
      } as any
    );
  }

  public componentWillReciveProps?(props: Props): void;

  private setNewProps(newProps: Props) {
    if (nullOrUndefined(newProps)) {
      return;
    }

    if (isFunction(this.componentWillReciveProps)) {
      this.componentWillReciveProps(newProps);
    }

    this.props = newProps;
  }

  private setNewState(newState: State) {
    if (nullOrUndefined(newState)) {
      return;
    }

    this.state = newState;
  }

  private getParentElement() {
    if (nullOrUndefined(this.element.dom)) {
      return null;
    }

    return this.element.dom.parentElement;
  }

  public updateComponent(props: Props, state: State) {
    this.setNewProps(props);
    this.setNewState(state);

    update(
      this.getParentElement() as any,
      this.element,
      this.render()
    );
  }


  public setElement(element: Element) {
    this.element = element;
  }

  public componentWillUnmount?(): void;

  public unmountSelf() {
    if (isFunction(this.componentWillUnmount)) {
      this.componentWillUnmount();
    }

    unmount(this.element, this.getParentElement() as any);
  }

}

export {
  Component
};
