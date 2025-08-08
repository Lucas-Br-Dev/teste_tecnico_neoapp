export type GibiReqType = {
    id: number;
    title: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    urls: {
        type: string;
        url: string;
    }[];
    series: {
        name: string;
    };
    format: string;
    issueNumber: number;
    pageCount: number;
};