import { getCurrentContext } from '../componentContext';

type UnsubscribeEffect = () => void;
type EffectCallback = () => UnsubscribeEffect | void
type Deps = any[];
type Effect = {
    callback: EffectCallback,
    deps: { cur: Deps, next: Deps },
    unsubscribe: UnsubscribeEffect | void
}
export type Effects = { [key: number]: Effect };

const useEffect = (callback: EffectCallback, deps: any[]) => {
    const { component, counter } = getCurrentContext();

    const effects = component.__effects__;
    if (!effects.hasOwnProperty(counter)) {
        // 初次挂载effect
        effects[counter] = {
            callback,
            deps: { cur: deps, next: deps },
            unsubscribe: undefined
        };
    } else {
        // 非初次
        effects[counter] = {
            callback,
            deps: { cur: effects[counter].deps.cur, next: deps },
            unsubscribe: effects[counter].unsubscribe
        }
    }
};

const compareDepsAndReturnNewDeps = (cur: any[], next: any[]) => {
    const nextDeps = {
        cur: next,
        next: []
    };
    let result: boolean = false;

    next.forEach((_, i) => {
        const partialDiff = Object.is(cur[i], next[i]);
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

export const execEffects = (effects: Effects, type: 'render' | 'update') => {
    const effectsArr = Object.entries(effects);

    effectsArr.forEach(effect => {
        const count = Number(effect[0]);
        const { callback, deps } = effect[1];
        if (type === 'update') {
            const { result: shouldExecCallback, deps: newDeps } = compareDepsAndReturnNewDeps(deps.cur, deps.next);
            if (shouldExecCallback) {
                callback();
            }
            effects[count].deps = newDeps;
        } else {
            const unsubscribe = callback();
            effects[count].unsubscribe = unsubscribe;
        }
    })
}

export default useEffect