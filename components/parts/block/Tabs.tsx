import * as React from 'react'
import { BlockData } from '.'

export type TabsType = "tabs"|"tabs-item"

export const RenderTabs: React.FC<{
    type: TabsType;
    children: any;
    data?: BlockData
}> = ({ type, children }) => {
    switch (type) {

        default:
            return <div>{children}</div>
    }
}
