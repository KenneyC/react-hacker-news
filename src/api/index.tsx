import {ReactElement, useState} from 'react';
import { URL } from './types';
import '../assets/style/spinner.scss'
import { translateSearchToArticle } from '../utils/helper';

export const useAPICaller = () => {
    const [ callingEndPoint, setCallingEndPoint ] = useState(false);

    const getBestItemsIds = async () => {
        setCallingEndPoint(true);
        const bestItems = await (await fetch(`${URL.HACKER_NEWS}/topstories.json?print=pretty`)).json();
        setCallingEndPoint(false);
        return bestItems;
    }

    const fetchArticleByIds = async (ids: Array<Number>) => {
        setCallingEndPoint(true);
        const articles =  await Promise.all(ids.map((id) => 
            fetch(`${URL.HACKER_NEWS}/item/${id}.json?print=pretty`).then(resp => resp.json())
            )
        );
        setCallingEndPoint(false);
        return articles;
    }

    const searchByQuery = async (query: string, pageNum?: number) => {
        const correctedQuery = query.replaceAll(' ', '%20');
        setCallingEndPoint(true);
        const result = await (await (fetch(`${URL.HACKER_SEARCH}/search?query=${correctedQuery}${pageNum ? `&page=${pageNum}` : ''}`))).json()
        result.hits = translateSearchToArticle(result.hits);
        setCallingEndPoint(false);
        return result;
    }

    const Loading = (): ReactElement => {
        return callingEndPoint ? <div className="lds-dual-ring"/> : <></>
    }

    return {Loading, getBestItemsIds, fetchArticleByIds, searchByQuery};
}
