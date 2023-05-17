import * as React from 'react';
import { updateCurrentComponent } from './componentContext';

type FuncComp<T> = (props: T) => React.ReactNode;

export declare class WithHookComp extends React.Component { }

// 挂载各种属性
function _bindComponent<T = {}>(funcComp: FuncComp<T>, compInstance: WithHookComp, props: T) {
  updateCurrentComponent(compInstance);

  return () => funcComp(props);
}

function withHooks<Props>(funcComp: (props: Props) => React.ReactNode) {
  const WithHookComp = class extends React.Component<Props>{
    constructor(props: Props) {
      super(props);
      this.state = {}
      this.render = _bindComponent(funcComp, this, props);
    }
  }

  return WithHookComp
}

export default withHooks;
export * from './hooks';
