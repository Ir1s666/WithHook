import { WithHookComp } from "..";
// 获取当前节点上下文
const useComponentContext = () => {
    let _currentComponent: WithHookComp;

    const updateCurrentComponent = (component: WithHookComp) => {
        _currentComponent = component;
    }

    const getCurrentComponent = () => {
        return _currentComponent
    }

    return {
        updateCurrentComponent,
        getCurrentComponent
    };
}

const { updateCurrentComponent, getCurrentComponent } = useComponentContext();
export { updateCurrentComponent, getCurrentComponent }
