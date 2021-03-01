import {useMemo} from 'react';
import { Article, SearchResult } from '../../api/types';
import { Score } from './sub-components/score';
import { getTimeRelativeToNow } from '../../utils/helper';
import './index.scss'

interface StorySampleProps {
    article: Article;
}

export const StorySample = (props: StorySampleProps) => {
    const {title, time, by, url, score} = props.article;
    const timePosted = useMemo(() => getTimeRelativeToNow(time), [time]);

    return <div className="story-sample-wrapper">
        <Score score={score} />
        <div className="story-sample-main-body">
            <a className="link" href={url}>{title}</a>
            <div className="story-sample-main-body-info">
                <span className="story-sample-main-body-subtext">{by}</span>
                <span className="story-sample-main-body-subtext">{timePosted.value} {timePosted.unit} ago</span>
            </div>
        </div>
    </div>
}