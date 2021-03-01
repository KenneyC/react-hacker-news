export enum URL {
    HACKER_NEWS = 'https://hacker-news.firebaseio.com/v0',
    HACKER_SEARCH = 'http://hn.algolia.com/api/v1'
}

export interface Article {
    [key: string]: any;
    by: string,
    descendants: number,
    id: number,
    kids: Array<number>,
    score: number,
    time: number,
    title: string,
    url: string,
    type: string,
    points: number,
}

export interface SearchResult extends Article {
    author: string,
    created_at: string,
    created_at_i: number,
    objectID: string,
    points: number;
    relevancy_score: number
}
