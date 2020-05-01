import * as React from 'react'
import { BlockData } from '.'

export type MathType = "math"

export const RenderMath: React.FC<{
    type: MathType;
    children: any;
    data?: BlockData
}> = ({ type, children }) => {
    switch (type) {

        default:
            return <div>{children}</div>
    }
}
