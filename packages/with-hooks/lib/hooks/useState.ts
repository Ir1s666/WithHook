// @ts-ignore
const useState: <S>(initialState: S) => [S, unknown] = (initialState) => {
    const _this = window.__current__;
    // @ts-ignore
    _this!._state_ = initialState


    return [_this!.state, (payload: any) => {
        console.log('###', payload)
        // @ts-ignore
        window.setState(payload)
    }];
};

export default useState;