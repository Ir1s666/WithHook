import { useState, useEffect } from './index';

function useMemo<T>(memoFunc: () => T, deps: any[]) {
    const [memo, updateMemo] = useState(memoFunc());

    useEffect(() => {
        updateMemo(memoFunc());
    }, deps)

    return memo;
}

export default useMemo;