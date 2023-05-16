const useState: <S>(initialState: S) => [S, unknown] = (initialState) => {
    const state = initialState;
    const _this = window.__current__;

    

    return [state, (payload: any) => {
        console.log('#####', _this, payload);
    }];
};

export default useState;