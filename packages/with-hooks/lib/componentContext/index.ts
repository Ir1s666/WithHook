import { WithHookComp } from "..";
// 获取当前节点上下文
const useComponentContext = () => {
    let _currentComponent: WithHookComp;
    let _stateCounter: number;

    const updateCurrentComponent = (component: WithHookComp) => {
        _currentComponent = component;
    }

    const getCurrentContext = () => {
        let _c = ++_stateCounter;
        return {
            component: _currentComponent,
            counter: _c
        }
    }

    const initStateCounter = () => {
        _stateCounter = 0
    }

    return {
        updateCurrentComponent,
        getCurrentContext,
        initStateCounter
    };
}

const { updateCurrentComponent, getCurrentContext, initStateCounter } = useComponentContext();
export { updateCurrentComponent, getCurrentContext, initStateCounter }