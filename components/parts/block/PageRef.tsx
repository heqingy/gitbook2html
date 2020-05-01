import * as React from 'react'
import { BlockData } from '.'

export type PageRefType = "page-ref"

export const RenderPageRef: React.FC<{
    type: PageRefType;
    data?: BlockData;
}> = ({ type, children, data }) => {
    switch (type) {
        case 'page-ref':
            return <div>{data?.page}{children}</div>
        default:
            return null
    }
}