import React, { useContext, useEffect, useState } from 'react';
import { useAPICaller } from '../../api';
import { Article } from '../../api/types';
import { StorySample } from '../../components/story-sample';
import { AppStateContext } from '../../utils/context/stores';
import { sortByProperty } from '../../utils/helper';
import { useInfiniteScroll } from '../../utils/hooks/infinite-scroll';
import { Filter } from './sub-components/filter';
import { SearchBar } from './sub-components/search-bar';
import './index.scss';
import { CHANGE_SEARCH_QUERY } from '../../utils/context/reducers/search';

export const HomePage = () => {
    const [topStories, setTopStories] = useState<Array<Number>>([]);
    const [currentArticles, setCurrentArticles] = useState<Array<Article>>([]);
    const [ currentAmountOfArcticles, setAmountOfArticles ] = useState<number>(15);
    const { state, dispatch } = useContext(AppStateContext);
    const bottomOfPage = useInfiniteScroll();
    const {Loading, fetchArticleByIds, getBestItemsIds, searchByQuery} = useAPICaller();

    useEffect(() => {    
        (async() => {
            const topStories: Array<Number> = await getBestItemsIds();
            setTopStories(topStories);
            const initialArticles = await fetchArticleByIds(topStories.slice(0, currentAmountOfArcticles));
            setCurrentArticles(sortByProperty(initialArticles, state.filter.sort));
        })()
    }, [])

    useEffect(() => {
        if (bottomOfPage && state.search.query === '') {
            (async() => {
                setAmountOfArticles(currentAmountOfArcticles + 15);
                const newArticles = await fetchArticleByIds(topStories.slice(0, currentAmountOfArcticles + 15));
                setCurrentArticles(sortByProperty(newArticles, state.filter.sort));
            })();
        } else if (bottomOfPage) {
            (async () => {
                const nextPageArticles = await searchByQuery(state.search.query, state.search.pageNum + 1);  
                const newArticles = [...currentArticles, ...nextPageArticles.hits];
                setCurrentArticles(newArticles);
            })();
        }
    }, [bottomOfPage])

    const handleSearchSubmit = async (event: any, enteredText: string) => {
        event.preventDefault();
        setCurrentArticles([]);
        dispatch({
            type: CHANGE_SEARCH_QUERY,
            payload: enteredText
        })
        const searchResults = await searchByQuery(enteredText);
        setCurrentArticles(searchResults.hits);
    }

    return (
        <div className="page">
            <SearchBar 
                handleSearchSubmit={handleSearchSubmit}
            />
            <Filter 
                currentArticles={currentArticles} 
                setCurrentArticles={setCurrentArticles} 
                totalNumArticles={topStories.length} 
            />
            {currentArticles.map(article => {
                return <StorySample article={article} key={article.id} />
            })}
            <div className="home-loading">
                <Loading />
            </div>
        </div>
    );
}