export interface AppState {
    filter: {
        sort: string;
    };
    search: {
        query: string;
        pageNum: number;
    }
}