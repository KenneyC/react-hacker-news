import React, { useEffect, useState } from 'react';
import { fetchArticleByIds, getBestItemsIds } from '../../api';
import { Article } from '../../api/types';
import { StorySample } from '../../components/story-sample';
import { useInfiniteScroll } from '../../utils/hooks/infinite-scroll';
import { Filter } from './sub-components/filter';

export const HomePage = () => {
    const [topStories, setTopStories] = useState<Array<Number>>([]);
    const [currentArticles, setCurrentArticles] = useState<Array<Article>>([]);
    const [ currentAmountOfArcticles, setAmountOfArticles ] = useState<number>(15);
    const bottomOfPage = useInfiniteScroll();

    useEffect(() => {    
        (async() => {
            const topStories: Array<Number> = await getBestItemsIds();
            setTopStories(topStories);
            const initialArticles = await fetchArticleByIds(topStories.slice(0, currentAmountOfArcticles));
            setCurrentArticles(initialArticles);
        })()
    }, [])

    useEffect(() => {
        if (bottomOfPage) {
            (async() => {
                setAmountOfArticles(currentAmountOfArcticles + 15);
                const newArticles = await fetchArticleByIds(topStories.slice(0, currentAmountOfArcticles + 15));
                setCurrentArticles(newArticles);
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