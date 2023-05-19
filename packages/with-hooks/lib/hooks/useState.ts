import {getCurrentContext} from '../componentContext';

type SetState<T> = (payload: T | ((prevState: T) => T)) => void
export function useState<T>(defaultState: T | (() => T)): [T, SetState<T>] {
    const {component, counter} = getCurrentContext();
    const state = component.state
    const setters = component.__setters__


    if (!state.hasOwnProperty(counter)) {
        if(typeof defaultState === 'function') {
            // @ts-ignore
            state[counter] = (defaultState as () => T)()
        } else {
            state[counter] = defaultState;
        }

        setters[counter] = (state) => {
            if(typeof state === 'function') {
                component.setState({ [counter]: state(component.state[counter]) });
            } else {
                component.setState({ [counter]: state });
            }
        }
    }

    return [state[counter], setters[counter]]
}

export default useState;