import React, { createContext, ReactElement, useReducer } from 'react';
import { filterStateReducer } from '../reducers/fitler';
import { searchStateReducer } from '../reducers/search';
import { AppState } from '../type';

const initialState: AppState = {
    filter: {
        sort: 'none'
    },
    search: {
        query: '',
        pageNum: 1
    }
}

const AppStateContext = createContext<{state: AppState; dispatch: React.Dispatch<any>}>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (state: AppState, action: any) => ({
    filter: filterStateReducer(state.filter, action),
    search: searchStateReducer(state.search, action)
})

const AppStateProvider = ( {children}: {children: ReactElement} ) => {
    const [ state, dispatch ] = useReducer(mainReducer, initialState);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>{children}</AppStateContext.Provider>
    )
}

export { AppStateContext, AppStateProvider};