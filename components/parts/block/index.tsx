import * as React from 'react';
import { HeadType, renderHead } from '@parts/block/Head.tsx';
import { checkBlockType } from '@lib/checkType.ts';
import { RenderList, ListType } from '@parts/block/List.tsx';
import { RenderCode, CodeType } from '@parts/block/Code.tsx';
import { RenderBlockquote, BlockquoteType } from '@parts/block/Blockquote.tsx';
import { RenderImage, ImageType } from '@parts/block/Image.tsx';
import { RenderTable, TableType } from '@parts/block/Table.tsx';
import { HintType, RenderHint, HintStyle } from '@parts/block/Hint.tsx';
import { RenderPageRef, PageRefType } from '@parts/block/PageRef.tsx';
import { RenderApiMethod, ApiMethodType } from '@parts/block/ApiMethod.tsx';
import { RenderTabs, TabsType } from '@parts/block/Tabs.tsx';
import { RenderMath, MathType } from '@parts/block/Math.tsx';
import { RenderFile, FileType } from '@parts/block/File.tsx';

type BlockType = "paragraph"

export type BlockData = {
    checked?: boolean
    assetID?: string
    caption?: string
    title?: string
    page?: string
    formula?: string
    syntax?: string
    aligns?: Array<'right' | 'left' | 'center'>
    style?: HintStyle
}

export const Block: React.SFC<Partial<{
    type: HeadType | BlockType | ListType | CodeType | BlockquoteType | ImageType | TableType | HintType | PageRefType | ApiMethodType | TabsType | MathType | FileType;
    children: any;
    data: BlockData
}>> = ({ type, children, data }) => {
    switch (checkBlockType(type)) {
        case 'heading':
            return renderHead(type as HeadType, children)
        case 'list':
            return <RenderList type={type as ListType} data={data}>{children}</RenderList>
        case 'code':
            return <RenderCode type={type as CodeType} data={data}>{children}</RenderCode>
        case 'blockquote':
            return <RenderBlockquote type={type as BlockquoteType}>{children}</RenderBlockquote>
        case 'image':
            return <RenderImage type={type as ImageType} data={data}>{children}</RenderImage>
        case 'table':
            return <RenderTable type={type as TableType} data={data}>{children}</RenderTable>
        case 'hint':
            return <RenderHint type={type as HintType} data={data}>{children}</RenderHint>
        case 'page':
            return <RenderPageRef type={type as PageRefType} data={data}>{children}</RenderPageRef>
        case 'api-method':
            return <RenderApiMethod type={type as ApiMethodType} data={data}>{children}</RenderApiMethod>
        case 'tabs':
            return <RenderTabs type={type as TabsType} data={data}>{children}</RenderTabs>
        case 'math':
            return <RenderMath type={type as MathType} data={data}>{children}</RenderMath>
        case 'file':
            return <RenderFile type={type as FileType} data={data}>{children}</RenderFile>
    }
    return <p>
        {children}
    </p>
}