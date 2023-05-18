import { getCurrentContext } from '../componentContext';

type SetState<T> = (payload: T) => void

export function useState<T>(defaultState: T): [T, SetState<T>] {
    const { component, counter } = getCurrentContext();
    const state = component.state
    const setters = component.__setters__


    if (!state.hasOwnProperty(counter)) {
        state[counter] = defaultState

        setters[counter] = (state) => {
            component.setState({ [counter]: state })
        }
    }

    return [state[counter], setters[counter]]
}

export default useState;