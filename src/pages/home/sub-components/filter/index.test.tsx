import { shallow } from 'enzyme';
import { mocked } from 'ts-jest/dist/utils/testing';
import { Filter } from '.';
import { Article } from '../../../../api/types';
import * as helperFunctions from '../../../../utils/helper';
describe('Filter', () => {
    let mockCurrentArticles: Array<Article>;
    let mockSetCurrentArticles: () => void;
    let mockTotalNumberOfArticles: number;

    beforeAll(() => {
        mockCurrentArticles = [{            
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
        }];
        mockSetCurrentArticles = jest.fn();
        mockTotalNumberOfArticles = 1;
    })

    it('should show correct text', () => {
        let wrapper = shallow(<Filter 
            currentArticles={mockCurrentArticles} 
            setCurrentArticles={mockSetCurrentArticles}
            totalNumArticles={mockTotalNumberOfArticles} 
        />)

        expect(wrapper.find('.filter-element').find('option').at(0).text()).toBe('None');
        expect(wrapper.find('.filter-element').find('option').at(1).text()).toBe('Score');
        expect(wrapper.find('.filter-element').find('option').at(2).text()).toBe('Time');
        
        expect(wrapper.find('.filter-wrapper').find('span').at(1).text()).toBe('Showing 1 article out of 1');

        mockCurrentArticles = [{            
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
        },
        {            
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
        }];
        mockTotalNumberOfArticles = 2;

        wrapper = shallow(<Filter 
            currentArticles={mockCurrentArticles} 
            setCurrentArticles={mockSetCurrentArticles}
            totalNumArticles={mockTotalNumberOfArticles} 
        />);
        expect(wrapper.find('.filter-wrapper').find('span').at(1).text()).toBe('Showing 2 articles out of 2');
    })
    
    it('should call sortByProperty with the correct parameters after selecting', () => {
        const wrapper = shallow(<Filter 
            currentArticles={mockCurrentArticles} 
            setCurrentArticles={mockSetCurrentArticles}
            totalNumArticles={mockTotalNumberOfArticles} 
        />);
        const mockSortedArticles = [
            {            
                title: 'testTitle123',
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
        ]
        
        const mockSortByProperty = jest.spyOn(helperFunctions, 'sortByProperty');
        mockSortByProperty.mockReturnValue(mockSortedArticles)
        wrapper.find('.filter-element').simulate('change', { target: { value: 'score'}});
        
        expect(mockSortByProperty).toHaveBeenCalledWith(mockCurrentArticles, 'score');
        expect(mockSetCurrentArticles).toHaveBeenCalledWith(mockSortedArticles);
    })
})