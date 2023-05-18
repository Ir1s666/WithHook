import * as React from 'react';
import { Effects, execEffects } from './hooks/useEffect';
import { updateCurrentComponent, initStateCounter } from './componentContext';

type FuncComp<T> = (props: T) => React.ReactNode;

export declare class WithHookComp extends React.Component {
  state: { [key: number]: any }
  __setters__: { [key: number]: (payload: unknown) => void }
  __effects__: Effects
}

function bindComponentWithProps<T = {}>(funcComp: FuncComp<T>, compInstance: WithHookComp, props: T) {
  return () => {
    updateCurrentComponent(compInstance);
    initStateCounter();
    return funcComp(props);
  }
}

function withHooks<Props>(funcComp: (props: Props) => React.ReactNode) {
  const WithHookComp = class extends React.Component<Props>{
    public __setters__ = {}
    public __effects__ = {}
    public state: { [key: number]: any }
    constructor(props: Props) {
      super(props);
      this.state = {}
      this.render = bindComponentWithProps(funcComp, this, props);
    }

    componentDidMount(): void {
      // console.log('###Did Mount, 当前effect listeners为', this)
      console.log('###初始化effect')
      execEffects(this.__effects__);
    }

    componentDidUpdate(): void {
      console.log('###didupdate 执行effect');
      execEffects(this.__effects__);
    }
  }

  return WithHookComp
}

export default withHooks;
export * from './hooks';
