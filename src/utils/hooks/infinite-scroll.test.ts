import { useInfiniteScroll } from './infinite-scroll';
import {renderHook, act} from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
describe('useInfiniteScroll', () => {
    let windowSpy: any;

    beforeEach(() => {
        Object.defineProperty(window.document.body, 'offsetHeight', {
            writable: false,
            value: 1
        })
        Object.defineProperty(window, 'innerHeight', {
            writable: false,
            value: 2,
        })
        Object.defineProperty(window, 'scrollY', {
            writable: false,
            value: 2,
        });
    })
    it('should detect scroll is at the bottom of the page', () => {
        
        const { result } = renderHook(() => useInfiniteScroll());

        act(() => {
            fireEvent.scroll(window);
        })
    
        expect(result.current).toBe(true);
    })
})