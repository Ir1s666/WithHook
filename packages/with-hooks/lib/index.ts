import * as React from 'react';
import { updateCurrentComponent, initStateCounter } from './componentContext';

type FuncComp<T> = (props: T) => React.ReactNode;

export declare class WithHookComp extends React.Component {
  __setters__: { [key: number]: (payload: unknown) => void }
  state: { [key: number]: any }
}

function bindComponentWithProps<T = {}>(funcComp: FuncComp<T>, compInstance: WithHookComp, props: T) {
  return () => {
    updateCurrentComponent(compInstance);
    initStateCounter();
    const result = funcComp(props);
    return result;
  }
}

function withHooks<Props>(funcComp: (props: Props) => React.ReactNode) {
  const WithHookComp = class extends React.Component<Props>{
    public __setters__ = {}
    public state: { [key: number]: any }
    constructor(props: Props) {
      super(props);
      this.state = {}
      this.render = bindComponentWithProps(funcComp, this, props);
    }
  }

  return WithHookComp
}

export default withHooks;
export * from './hooks';
