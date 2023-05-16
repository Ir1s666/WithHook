import * as React from 'react';
type FuncComp<T> = (props: T) => React.ReactNode;

window.__current__ = null;

const _bindProps = <T = {}>(funcComp: FuncComp<T>, props: T) => {
  return () => funcComp(props);
}

function withHooks<Props>(funcComp: (props: Props) => React.ReactNode) {
  class WithHookComp extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
      this.render = _bindProps(funcComp, props);
      window.__current__ = this;
    }
  }

  return WithHookComp
}

export default withHooks;
export * from './hooks';
