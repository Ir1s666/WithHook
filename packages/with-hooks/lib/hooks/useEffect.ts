import { getCurrentContext } from '../componentContext';

type UnsubscribeEffect = () => void;
type EffectCallback = () => UnsubscribeEffect | void
type Deps = any[];
type Effect = {
    callback: EffectCallback,
    deps: { prev: Deps, next: Deps },
    unsubscribe: UnsubscribeEffect | void
}
export type Effects = { [key: number]: Effect };

const useEffect = (callback: EffectCallback, deps: any[]) => {
    const { component, counter } = getCurrentContext();

    const effects = component.__effects__;
    if (!effects.hasOwnProperty(counter)) {
        // 初次挂载effect
        console.log('%c###后续执行effect', 'background: blue')
        effects[counter] = {
            callback,
            deps: { prev: deps, next: [] },
            unsubscribe: undefined
        };
    } else {
        // 非初次
        effects[counter] = {
            callback,
            deps: { ...effects[counter].deps, next: deps },
            unsubscribe: undefined
        }
        console.log('%c###后续执行effect', 'background: orange');
    }
};

const compareDepsAndReturnNewDeps = (prev: any[], next: any[]) => {
    const nextDeps = {
        prev: next,
        next: []
    };
    let result: boolean = false;

    next.forEach((e, i) => {
        const partialDiff = Object.is(prev[i], next[i]);
        console.log('###是否', prev[i], next[i], partialDiff)
        if (!partialDiff) {
            result = true
            return
        }
    })

    return {
        result,
        deps: nextDeps
    }
}

export const execEffects = (effects: Effects) => {
    const effectsArr = Object.entries(effects);

    effectsArr.forEach(effect => {
        const count = Number(effect[0]);
        const { callback, deps, unsubscribe } = effect[1];

        console.log('###执行effect count', count);
        console.log('###执行effect callback', callback);
        console.log('###执行effect deps', deps);
        console.log('###执行effect unsubscribe', unsubscribe);

        const { result: shouldExecCallback, deps: newDeps } = compareDepsAndReturnNewDeps(deps.prev, deps.next);
        console.log('###是否需要执行callback', shouldExecCallback)
        shouldExecCallback && callback();
        effects[count].deps = newDeps;
    })
}

export default useEffect