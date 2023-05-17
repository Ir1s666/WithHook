import { WithHookComp } from "..";
// 获取当前节点上下文
const useComponentContext = () => {
    let _currentComponent: WithHookComp;
    let counter = 0;

    const updateCurrentComponent = (component: WithHookComp) => {
        _currentComponent = component;
    }

    const getCurrentContext = () => {
        let _c = counter++;
        return {
            component: _currentComponent,
            counter: _c
        }
    }

    return {
        updateCurrentComponent,
        getCurrentContext,
    };
}

const { updateCurrentComponent, getCurrentContext } = useComponentContext();
export { updateCurrentComponent, getCurrentContext }