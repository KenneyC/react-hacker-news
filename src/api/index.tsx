import { URL } from './types'

export const getBestItemsIds = async () => {
    return await (await fetch(`${URL.HACKER_NEWS}/topstories.json?print=pretty`)).json();
}

export const fetchArticleByIds = async (ids: Array<Number>) => {
    return await Promise.all(ids.map((id) => 
        fetch(`${URL.HACKER_NEWS}/item/${id}.json?print=pretty`).then(resp => resp.json())
        )
    );
}
