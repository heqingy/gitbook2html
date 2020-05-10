

declare const STATIC_PATH: string;
declare const pageName: string;
declare const versionName: string;
declare const ReactKaTeX: any;
declare const InlineMath: any;
declare const KaTeX: any;
declare const antd: any;
declare const reversion: ReVersion;
declare module 'react-katex';
declare module '*.css';
declare module '@lib/codeBlock/index.js';
declare module '@lib/syntaxHighhligter/index.js';

declare type Pages = Array<VersionInfo>
declare type VersionInfo = {
    uid: string;
    parentPath?: string;
    title: string;
    kind: 'document' | 'group';
    description: string;
    path: string;
    href: string;
    documentURL: string;
    createdAt: string;
    pages: Pages;
    github: any;
    isPathUntouched: boolean;
    stats: { words: number, images: number, codeLines: number, revisions: number };
    edits: { contributions: Array<any> };
}

declare type ReVersion = {
    versions: Record<string, TopLevelVersion>
}

declare type TopLevelVersion = {
    page: VersionInfo
    ref: "2.2.0"
    title: "2.2"
}



