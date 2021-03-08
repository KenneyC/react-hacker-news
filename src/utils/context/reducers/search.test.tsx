import { changeSearchPageNum, changeSearchQuery, searchStateReducer, CHANGE_SEARCH_QUERY, CHANGE_SEARCH_PAGE_NUM } from './search';

describe('search.tsx', () => {
    describe('changeSearchQuery', () => {
        it('should return the correct action object', () => {
            const action = changeSearchQuery('mockQuery');

            expect(action.type).toBe(CHANGE_SEARCH_QUERY);
            expect(action.payload).toBe('mockQuery');
        })
    })

    describe('changeSearchPageNum', () => {
        it('should return the correct action object', () => {
            const action = changeSearchPageNum(1);

            expect(action.type).toBe(CHANGE_SEARCH_PAGE_NUM);
            expect(action.payload).toBe(1);
        })
    })

    describe('searchStateReducer', () => {
        it('should return the correct query state after dispatching changeSearchQuery action', () => {
            const mockState = {
                query: '',
                pageNum: 0,
            }

            const newState = searchStateReducer(mockState, changeSearchQuery('test query'));

            expect(newState.query).toBe('test query');
        });

        it('should return the correct page number state adter dispatching changeSearchPageNum action', () => {
            const mockState = {
                query: '',
                pageNum: 0,
            }

            const newState = searchStateReducer(mockState, changeSearchPageNum(1));

            expect(newState.pageNum).toBe(1);
        });

        it('should return the passed in state if action type is not defined', () => {
            const mockState = {
                query: '',
                pageNum: 0,
            }

            const newState = searchStateReducer(mockState, {type: 'undefined'});

            expect(newState).toBe(newState);
        })
    })
})