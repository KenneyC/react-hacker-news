import React, { useContext, useEffect, useState } from 'react';
import { fetchArticleByIds, getBestItemsIds } from '../../api';
import { Article } from '../../api/types';
import { StorySample } from '../../components/story-sample';
import { AppStateContext } from '../../utils/context/stores';
import { sortByProperty } from '../../utils/helper';
import { useInfiniteScroll } from '../../utils/hooks/infinite-scroll';
import { Filter } from './sub-components/filter';

export const HomePage = () => {
    const [topStories, setTopStories] = useState<Array<Number>>([]);
    const [currentArticles, setCurrentArticles] = useState<Array<Article>>([]);
    const [ currentAmountOfArcticles, setAmountOfArticles ] = useState<number>(15);
    const { state } = useContext(AppStateContext);
    const bottomOfPage = useInfiniteScroll();

    useEffect(() => {    
        (async() => {
            const topStories: Array<Number> = await getBestItemsIds();
            setTopStories(topStories);
            const initialArticles = await fetchArticleByIds(topStories.slice(0, currentAmountOfArcticles));
            setCurrentArticles(sortByProperty(initialArticles, state.filter.sort));
        })()
    }, [])

    useEffect(() => {
        if (bottomOfPage) {
            (async() => {
                setAmountOfArticles(currentAmountOfArcticles + 15);
                const newArticles = await fetchArticleByIds(topStories.slice(0, currentAmountOfArcticles + 15));
                setCurrentArticles(sortByProperty(newArticles, state.filter.sort));
            })();
        }
    }, [bottomOfPage])

    return (
        <div className="page">
            <Filter 
                currentArticles={currentArticles} 
                setCurrentArticles={setCurrentArticles} 
                totalNumArticles={topStories.length} 
            />
            {currentArticles.map(article => {
                return <StorySample article={article} />
            })}
        </div>
    );
}