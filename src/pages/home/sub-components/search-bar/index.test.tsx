import { SearchBar } from './index';
import { shallow } from 'enzyme';

describe('SearchBar', () => {
    let mockHandleSearchSubmit: (event: any, enteredText: string) => void;
    beforeAll(() => {
        mockHandleSearchSubmit = jest.fn();
    })
    it('should submit the correct text query', () => {
        const wrapper = shallow(<SearchBar handleSearchSubmit={mockHandleSearchSubmit} />);
        const mockEvent = {
            target: {
                value: '123'
            },
            preventDefault: jest.fn()
        }

        wrapper.find('input').simulate('change', mockEvent);
        wrapper.find('.search-bar-wrapper').simulate('submit', mockEvent);

        expect(mockHandleSearchSubmit).toHaveBeenCalledWith(mockEvent, '123');
    })
})