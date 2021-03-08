import { shallow, mount } from 'enzyme';
import { HomePage } from '.'
import { Article } from '../../api/types';
import { StorySample } from '../../components/story-sample';
import { Filter } from './sub-components/filter';
import { SearchBar } from './sub-components/search-bar';
describe('HomePage', () => {
    const mockArticles : Array<Article> = [
        {
            by: 'author1',
            id: 123,
            time: 1234,
            score: 12313,
            title: 'title1',
            url: 'url1',
            type: '',
            descendants: 1234,
            kids: [],
            points: 12313
        },
        {
            by: 'author2',
            id: 123,
            time: 12345,
            score: 123,
            title: 'title1',
            url: 'url1',
            type: '',
            descendants: 1234,
            kids: [],
            points: 123
        },
    ]
    const mockGetBestItemIds = jest.fn();

    it('should display a search bar', () => {
        const wrapper = shallow(<HomePage />);

        expect(wrapper.find('.page').find(SearchBar).length).toBe(1);
    })

    it('should display a filter', () => {
        const wrapper = shallow(<HomePage />);

        expect(wrapper.find('.page').find(Filter).length).toBe(1);
    })
})