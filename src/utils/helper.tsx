import moment from 'moment'
import { Article, SearchResult } from '../api/types';
import { TimeDifference } from './types'

export const getTimeRelativeToNow = (time: number): TimeDifference => {
    const now = moment();
    const duration = moment.duration(now.diff(moment.unix(time)));

    const daysDifference = duration.asDays();
    const hoursDifference = duration.asHours();
    const minutesDifference = duration.asMinutes();

    return daysDifference >= 1 ? 
        {value: Math.floor(daysDifference), unit: 'days'} 
            : hoursDifference >= 1 ?
                {value: Math.floor(hoursDifference), unit: 'hours'}
                : { value: Math.floor(minutesDifference), unit: 'minutes' } 
}

export const translateSearchToArticle = (searchResults: Array<SearchResult>) => {
    const translatedSearchResults: Array<Article> = [];

    searchResults.forEach((result: SearchResult) => {
        translatedSearchResults.push({
            by: result.author,
            id: parseInt(result.objectID),
            time: result.created_at_i,
            score: result.points,
            title: result.title,
            url: result.url,
            type: '',
            descendants: result.parent_id,
            kids: [],
            points: result.points
        })
    })
    
    return translatedSearchResults;    
}

export const sortByProperty = (articles: Array<Article | SearchResult>, property: string) => {
    if (property === 'none') return articles;
    const articlesClone: Array<Article | SearchResult> = JSON.parse(JSON.stringify(articles));

    articlesClone.sort((firstArticle, secondArticle) => {
        return firstArticle[property] > secondArticle[property] ? -1 : firstArticle[property] === secondArticle[property] ? 0 : 1;
    })

    return articlesClone;
}
