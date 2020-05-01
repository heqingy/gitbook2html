import * as React from 'react'
import { BlockData } from '.'

export type FileType = "file"

export const RenderFile: React.FC<{
    type: FileType;
    children: any;
    data?: BlockData
}> = ({ type, children }) => {
    switch (type) {
        default:
            return <div>{children}</div>
    }
}
