declare const STATIC_PATH: string;
declare const pageName: string;
declare const pageRoutes: PageRoutes;
declare module 'react-latex';
declare module 'react-katex';

declare type PageInfo = {
    uid: string,
    title: string,
    kind: string,
    description: string,
    path: string,
    href: string,
    documentURL: string,
    createdAt: string,
    pages: Array<PageInfo>,
    github: any,
    isPathUntouched: boolean,
    stats: { words: number, images: number, codeLines: number, revisions: number },
    edits: { contributions: Array<any> }
}

declare type PageRoutes = {
    ref: string;
    title: string;
    page: PageInfo;
    github: any;
    locale: any;
}
