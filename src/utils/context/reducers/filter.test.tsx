import { shallow } from 'enzyme';
import { AppState } from '../type';
import { CHANGE_SORT_FILTER, filterStateReducer, changeSortFilter } from './fitler';

describe('filter.ts', () => {

    describe('changeSortFilter', () => {
        const action = changeSortFilter('score');

        expect(action.payload).toBe('score');
        expect(action.type).toBe(CHANGE_SORT_FILTER);
    })
    describe('filterStateReducer', () => {
        const mockState = {
            sort: 'any'
        }
        it('should return correct state when CHANGE_SORT_FILTER is dispatched', () => {
            const mockAction = {
                type: CHANGE_SORT_FILTER,
                payload: 'name'
            }

            const newState = filterStateReducer(mockState, mockAction);

            expect(newState.sort).toBe('name');
        });

        it('should return the passed in state when action type is incorrect', () => {
            const mockAction = {
                type: '',
                payload: '',
            }

            const newState = filterStateReducer(mockState, mockAction);

            expect(newState.sort).toBe('any');
        })
    })
})
