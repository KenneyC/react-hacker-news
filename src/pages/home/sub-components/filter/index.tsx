import React, { useContext } from 'react';
import { Article } from '../../../../api/types';
import { CHANGE_SORT_FILTER } from '../../../../utils/context/reducers/fitler';
import { AppStateContext } from '../../../../utils/context/stores';
import { sortByProperty } from '../../../../utils/helper';
import './index.scss'

interface FilterProps {
    currentArticles: Array<Article>;
    setCurrentArticles: any;
    totalNumArticles: number;
}

export const Filter: React.FC<FilterProps> = (props: FilterProps) => {
    const { currentArticles, setCurrentArticles, totalNumArticles } = props;
    const { state, dispatch } = useContext(AppStateContext);

    const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: CHANGE_SORT_FILTER, payload: event.target.value})
        setCurrentArticles(sortByProperty(currentArticles, event.target.value));
    }

    return (
        <div className="filter-wrapper">
            <form onSubmit={() => {}}>
                <label>
                    <span>Sort:</span>
                        <select className="filter-element" value={state.filter.sort} onChange={handleValueChange}>
                            <option value="none">None</option>
                            <option value="score">Score</option>
                            <option value="time">Time</option>
                        </select>
                </label>
            </form>
            <span>Showing {currentArticles.length} articles out of {totalNumArticles}</span>
        </div>
    )
}