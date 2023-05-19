import * as React from 'react';
import {Effects, execEffects} from './hooks/useEffect';
import {updateCurrentComponent, initStateCounter} from './componentContext';

type FuncComp<T> = (props: T) => React.ReactNode;

export declare class WithHookComp extends React.Component {
    state: { [key: number]: any }
    __setters__: { [key: number]: (payload: unknown | ((prevState: unknown) => unknown)) => void }
    __effects__: Effects
}

function bindComponentWithProps<T = {}>(funcComp: FuncComp<T>, compInstance: WithHookComp) {
    return () => {
        updateCurrentComponent(compInstance);
        initStateCounter();
        return funcComp(compInstance.props as T);
    }
}

function withHooks<Props>(funcComp: (props: Props) => React.ReactNode) {
    return class extends React.Component<Props> {
        public __setters__ = {}
        public __effects__ = {}
        public state: { [key: number]: any }

        constructor(props: Props) {
            super(props);
            this.state = {}
            this.render = bindComponentWithProps(funcComp, this);
        }

        componentDidMount(): void {
            console.log('###初始化effect')
            execEffects(this.__effects__);
        }

        componentDidUpdate(): void {
            console.log('###didupdate 执行effect');
            execEffects(this.__effects__);
        }
    }
}

export default withHooks;
export * from './hooks';
