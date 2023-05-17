import { getCurrentComponent } from '../componentContext';

// @ts-ignore
const useState: <S>(initialState: S) => [S, (payload: S) => void] = (initialState) => {
    const currentComponent = getCurrentComponent();
    currentComponent.initialState = {
        ['qq']: initialState
    };

    // @ts-ignore
    return [currentComponent.state?.['qq'], (payload: S) => {
        // @ts-ignore
        currentComponent.setState({'qq': payload})
        console.log('###setState', payload, currentComponent);
    }];
};

export default useState;