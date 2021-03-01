export const CHANGE_SORT_FILTER: string = 'CHANGE_SORT_FILTER';

export const changeSortFilter = (sortType: 'score' | 'name') => ({
    type: CHANGE_SORT_FILTER,
    payload: sortType
}) 

export const filterStateReducer = (state: any, action: any) => {
    switch (action.type) {
        case CHANGE_SORT_FILTER:
            const newState = JSON.parse(JSON.stringify(state));
            newState.sort = action.payload;
            return newState;
        default:
            return state;
    }
}