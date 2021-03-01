import React, { createContext, ReactElement, useReducer } from 'react';
import { filterStateReducer } from '../reducers/fitler';
import { AppState } from '../type';

const initialState: AppState = {
    filter: {
        sort: 'none'
    }
}

const AppStateContext = createContext<{state: AppState; dispatch: React.Dispatch<any>}>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (state: AppState, action: any) => ({
    filter: filterStateReducer(state.filter, action)
})

const AppStateProvider = ( {children}: {children: ReactElement} ) => {
    const [ state, dispatch ] = useReducer(mainReducer, initialState);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>{children}</AppStateContext.Provider>
    )
}

export { AppStateContext, AppStateProvider};