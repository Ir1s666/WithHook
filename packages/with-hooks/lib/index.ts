import * as React from 'react';
import { updateCurrentComponent } from './componentContext';

type FuncComp<T> = (props: T) => React.ReactNode;

export declare class WithHookComp extends React.Component {
  initialState: { [key: string]: any }
}
// 挂载各种属性
const _bindComponent = <T = {}>(funcComp: FuncComp<T>, props: T, compInstance: WithHookComp) => {
  // window.__current__ = compInstance;
  updateCurrentComponent(compInstance);

  // 先执行一次，挂载state
  funcComp(props);

  return () => funcComp(props);
}


function withHooks<Props>(funcComp: (props: Props) => React.ReactNode) {
  const WithHookComp = class extends React.Component<Props>{
    public initialState = {};
    constructor(props: Props) {
      super(props);
      this.render = _bindComponent(funcComp, props, this);
    }
  }

  return WithHookComp
}

export default withHooks;
export * from './hooks';
