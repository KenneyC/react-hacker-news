import { StorySample } from './index';
import { shallow } from 'enzyme';
import { Article } from '../../api/types';

jest.mock('../../utils/helper', () => {
    return {
        getTimeRelativeToNow: () => ({
            value: 1,
            unit: 'minute'
        })
    }
})

describe('StorySample', () => {

    it('should render the correct information', () => {
        const mockInformation: Article = {
            title: 'testTitle',
            url: 'Url123',
            by: 'ABC',
            time: 1615154239,
            score: 123,
            descendants: 123,
            id: 123123123,
            kids: [],
            type: 'story',
            points: 123
        }

        const wrapper = shallow(<StorySample article={mockInformation} />);

        expect(wrapper.find('.link').text()).toBe(mockInformation.title);
        expect(wrapper.find('.story-sample-main-body-info').text()).toContain(mockInformation.by)
        expect(wrapper.find('.story-sample-main-body-info').text()).toContain('1 minute ago')
    })

})