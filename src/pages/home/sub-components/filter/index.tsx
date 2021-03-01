import React, { useState } from 'react';
import { Article } from '../../../../api/types';
import { sortByProperty } from '../../../../utils/helper';
import './index.scss'

interface FilterProps {
    currentArticles: Array<Article>;
    setCurrentArticles: any;
    totalNumArticles: number;
}

export const Filter: React.FC<FilterProps> = (props: FilterProps) => {
    const { currentArticles, setCurrentArticles, totalNumArticles } = props;
    const [sortValue, setSortValue] = useState<string>("score");

    const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortValue(event.target.value);
        setCurrentArticles(sortByProperty(currentArticles, event.target.value));
    }

    return (
        <div className="filter-wrapper">
            <form onSubmit={() => {}}>
                <label>
                    <span>Sort:</span>
                        <select className="filter-element" value={sortValue} onChange={handleValueChange}>
                            <option value="score">Score</option>
                            <option value="time">Time</option>
                        </select>
                </label>
            </form>
            <span>Showing {currentArticles.length} articles out of {totalNumArticles}</span>
        </div>
    )
}