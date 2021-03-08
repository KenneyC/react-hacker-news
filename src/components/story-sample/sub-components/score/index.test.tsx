import { Score } from './index';
import { shallow } from 'enzyme';
describe('Score', () => {

    it('should display the correct score: < 1', () => {
        let wrapper = shallow(<Score score={0} />);

        expect(wrapper.find('.score-number').text()).toBe('0');
        expect(wrapper.find('.score-text').text()).toBe('point');

        wrapper = shallow(<Score score={-1} />);

        expect(wrapper.find('.score-number').text()).toBe('-1');
        expect(wrapper.find('.score-text').text()).toBe('points');
    })
    it('should display the correct score: 1', () => {
        const wrapper = shallow(<Score score={1} />)
        expect(wrapper.find('.score-number').text()).toBe('1');
        expect(wrapper.find('.score-text').text()).toBe('point');
    })

    it('should display the correct score: > 1', () => {
        const wrapper = shallow(<Score score={10} />)
        expect(wrapper.find('.score-number').text()).toBe('10');
        expect(wrapper.find('.score-text').text()).toBe('points');
    })
})