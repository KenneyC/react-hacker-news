export const CHANGE_SEARCH_QUERY: string = 'CHANGE_SEARCH_QUERY';
export const CHANGE_SEARCH_PAGE_NUM: string = 'CHANGE_SEARCH_PAGE_NUM';

export const changeSearchQuery = (payload: string) => ({
    type: CHANGE_SEARCH_QUERY,
    payload
});

export const changeSearchPageNum = (payload: number) => ({
    type: CHANGE_SEARCH_PAGE_NUM, 
    payload
});

export const searchStateReducer = (state: any, action: any) => {
    switch (action.type) {
        case CHANGE_SEARCH_QUERY:
            const newState = JSON.parse(JSON.stringify(state));
            newState.query = action.payload;
            return newState;
        case CHANGE_SEARCH_PAGE_NUM:
            const newSearchState = JSON.parse(JSON.stringify(state));
            newSearchState.pageNum = action.payload;
            return newSearchState;
        default:
            return state;
    }
}
