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



// type EffectCleanup = () => void
// type EffectFunc = () => (void | EffectCleanup)
// export type HooksInputs = any[] | undefined

// export interface HooksComponentEffects {
//     [counter: number]: [EffectFunc | undefined, EffectCleanup | undefined, HooksInputs | undefined]
// }

// export function inputsChange(oldInputs: HooksInputs, newInputs: HooksInputs) {
//     if (oldInputs && newInputs) {
//         if (oldInputs.length > 0 && newInputs.length > 0) {
//             if (oldInputs.length === newInputs.length) {
//                 for (let i = 0, l = oldInputs.length; i < l; i++) {
//                     if (oldInputs[i] !== newInputs[i]) {
//                         return true
//                     }
//                 }
//             } else {
//                 return true
//             }
//         }
//         return false
//     }
//     return true
// }

// function useEffectHandler(effects: HooksComponentEffects, counter: number, effectFunc: EffectFunc, inputs?: HooksInputs) {
//     if (!effects.hasOwnProperty(counter)) {
//         effects[counter] = [effectFunc, undefined, inputs]
//     } else {
//         const [, , oldInputs] = effects[counter]
//         if (inputsChange(inputs, oldInputs)) {
//             effects[counter][0] = effectFunc
//             effects[counter][2] = inputs
//         }
//     }
// }

// export function runEffects(effects: HooksComponentEffects) {
//     Object.getOwnPropertyNames(effects).forEach((_counter) => {
//         const counter = parseInt(_counter)
//         const [effectFunc, cleanup,] = effects[counter]
//         if (typeof effectFunc === 'function') {
//             if (typeof cleanup === 'function') {
//                 cleanup()
//             }
//             const nextCleanup = effectFunc()
//             effects[counter][0] = undefined
//             effects[counter][1] = typeof nextCleanup === 'function' ? nextCleanup : undefined
//         }
//     })
// }

// export function cleanupEffects(effects: HooksComponentEffects) {
//     Object.getOwnPropertyNames(effects).forEach((_counter) => {
//         const counter = parseInt(_counter)
//         const [, cleanup,] = effects[counter]
//         if (typeof cleanup === 'function') {
//             cleanup()
//         }
//         delete effects[counter]
//     })
// }

// export function useEffect(effectFunc: EffectFunc, inputs?: HooksInputs) {
//     const { component, counter } = getCurrentContext()
//     // @ts-ignore
//     useEffectHandler(component.__effects__, counter, effectFunc, inputs)
// }