import { getCurrentContext } from '../componentContext';

type SetState<T> = (payload: T) => void

export function useState<T>(defaultState: T): [T, SetState<T>] {
    const { component } = getCurrentContext();
    console.log('###com', component);

    if (!component.state.hasOwnProperty('q')) {
        // @ts-ignore
        component.state['q'] = defaultState
    }

    // @ts-ignore
    return [component.state['q'], (payload) => {
        component.setState({ ['q']: payload })

    }]
}

export default useState;