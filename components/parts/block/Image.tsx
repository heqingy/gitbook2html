import * as React from 'react'
import { BlockData } from '.'
const assets = require('@build/assets')

export type ImageType = "image"

export const RenderImage: React.FC<{ type: ImageType, data?: BlockData, children: any }> = ({ type, children, data }) => {
    switch (type) {
        case "image":
            const origin_key = Object.keys(assets).find(k => !!data?.assetID && k.startsWith(data?.assetID))
            return <div>
                {
                    !!origin_key && <div>
                        <img style={{ width: "70%", margin: "0 auto", display: "block" }} src={`${STATIC_PATH}${assets[origin_key]?.path}`} />
                        <div style={{ textAlign: 'center', color: "rgb(157, 170, 182)", fontSize: "16px",marginTop:"8px" }}>{data?.caption}</div>
                    </div>
                }
                {children}
            </div>
        default:
            return children
    }
}