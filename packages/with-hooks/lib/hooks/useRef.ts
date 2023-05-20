import React from 'react'
import { getCurrentContext } from "../componentContext";

const useRef = <T>(initRef: T) => {
    const { component, counter } = getCurrentContext();
    const refs = component.__refs__;

    if (!refs.hasOwnProperty(counter)) {
        refs[counter] = React.createRef<T>();
        (refs[counter].current as any) = initRef;
    };

    return refs[counter];
}

export default useRef;