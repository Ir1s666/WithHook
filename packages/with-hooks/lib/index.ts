import * as React from 'react';
type FuncComp<T> = (props: T) => React.ReactNode;

window.__current__ = null;

const _bindComponent = <T = {}>(funcComp: FuncComp<T>, props: T, compInstance: React.Component) => {
  window.__current__ = compInstance;

  // 先执行一次，挂载state
  funcComp(props);

  return () => funcComp(props);
}

function withHooks<Props>(funcComp: (props: Props) => React.ReactNode) {
  class WithHookComp extends React.Component<Props>{
    constructor(props: Props) {
      super(props);
      this.render = _bindComponent(funcComp, props, this);
      // @ts-ignore
      this.state = this._state_;
      // @ts-ignore
      window.setState = this.setState.bind(this)
    }
  }



  return WithHookComp
}

export default withHooks;
export * from './hooks';
