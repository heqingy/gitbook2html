

declare const STATIC_PATH: string;
declare const pageName: string;
declare const ReactKaTeX: any;
declare const InlineMath: any;
declare const KaTeX: any;
declare const antd: any;
declare const pageRoutes: PageRoutes;
declare module 'react-katex';
declare module 'react-code-blocks';
// declare module 'jquery';
// declare module 'react-dom';
// declare var $: any

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
