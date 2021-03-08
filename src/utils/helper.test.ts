import { Article, SearchResult } from '../api/types';
import {getTimeRelativeToNow, sortByProperty, translateSearchToArticle} from './helper';

describe('helper.ts', () => {

    describe('getTimeRelativeNow', () => {

        beforeEach(() => {
            Date.now = jest.fn(() => {
                return new Date(1615174877 * 1000);
            }) as any;
        })
        it('should return the correct relative time: days', () => {
            const relativeTime = getTimeRelativeToNow(1615174877 - 86400 * 2);
    
            expect(relativeTime.unit).toBe('days');
            expect(relativeTime.value).toBe(2);
        })

        it('should return the correct relative time: hours', () => {
            const relativeTime = getTimeRelativeToNow(1615174877 - 3600 * 4);
    
            expect(relativeTime.unit).toBe('hours');
            expect(relativeTime.value).toBe(4);
        })

        it('should return the correct relative time: hours', () => {
            const relativeTime = getTimeRelativeToNow(1615174877 - 60);
    
            expect(relativeTime.unit).toBe('minutes');
            expect(relativeTime.value).toBe(1);
        })

        it('should return the correct relative time: less than a minute', () => {
            const relativeTime = getTimeRelativeToNow(1615174877 - 10);
    
            expect(relativeTime.unit).toBe('minutes');
            expect(relativeTime.value).toBe(0);
        })
    });

    describe('translateSearchToArticle', () => {
        it('should return a correct translated article', () => {
            const mockSearchResult = {
                author: 'author1',
                objectID: "123",
                created_at_i: 123,
                created_at: "2000-01-01",
                points: 123,
                title: "title1",
                url: "123",
                type: "story",
                parent_id: "parent1",
                relevancy_score: 123
            }
    
            const translatedArticle = translateSearchToArticle([mockSearchResult as any as SearchResult])
    
            expect(translatedArticle[0].by).toBe(mockSearchResult.author);
            expect(translatedArticle[0].id).toBe(parseInt(mockSearchResult.objectID));
            expect(translatedArticle[0].time).toBe(mockSearchResult.created_at_i);
            expect(translatedArticle[0].score).toBe(mockSearchResult.points);
            expect(translatedArticle[0].url).toBe(mockSearchResult.url);
            expect(translatedArticle[0].type).toBe(''),
            expect(translatedArticle[0].descendants).toBe(mockSearchResult.parent_id);
            expect(translatedArticle[0].kids.length).toBe(0);
            expect(translatedArticle[0].points).toBe(mockSearchResult.points);
        })
    })

    describe('sortByProperty', () => {
        const mockArticles: Article[] = [
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
            {
                by: 'author3',
                id: 123,
                time: 134,
                score: 1356,
                title: 'title1',
                url: 'url1',
                type: '',
                descendants: 1234,
                kids: [],
                points: 1356
            }
        ]

        it('should return the correct sorting: score', () => {
            const sortedArticles: Article[] = sortByProperty(mockArticles, 'score');

            expect(sortedArticles[0].by).toBe('author1');
            expect(sortedArticles[1].by).toBe('author3');
            expect(sortedArticles[2].by).toBe('author2');
        })

        it('should return the correct sorting: time', () => {
            const sortedArticles: Article[] = sortByProperty(mockArticles, 'time');

            expect(sortedArticles[0].by).toBe('author2');
            expect(sortedArticles[1].by).toBe('author1');
            expect(sortedArticles[2].by).toBe('author3');
        })
    })
})