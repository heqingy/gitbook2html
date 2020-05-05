import * as React from 'react'
import { BlockData } from '.'
import DownloadOutlined from '@ant-design/icons/DownCircleOutlined'
import { OnHover } from '@lib/OnHover.tsx'
import { renderFileSize } from '@lib/renderFileSize.ts'
const { message } = antd
const assets = require('@build/assets')

export type FileType = "file"

export const RenderFile: React.FC<{
    type: FileType;
    children: any;
    data?: BlockData
}> = ({ type, children, data }) => {
    const origin_key = Object.keys(assets).find(k => !!data?.assetID && k.startsWith(data?.assetID))
    const origin_name = origin_key?.split('-').slice(2).join('')
    const fileInfo = assets[origin_key!]
    switch (type) {
        default:
            return <React.Fragment>
                {
                    !!origin_key && <OnHover>
                        {
                            onHover => {
                                return <a onClick={() => message.success('正在下载...')} style={{ color: "#FFD139" }} download={origin_key} href={`${STATIC_PATH}${fileInfo?.path}`}>
                                    <div style={{ border: `1px solid ${onHover ? "#FFD139" : "#e2e9ef"}`, borderRadius: "3px", padding: "16px", display: "flex", justifyContent: "space-between" }}>
                                        <div style={{ display: "flex", alignItems: "center", }}>
                                            <DownloadOutlined style={{ fontSize: "24px", marginRight: "16px" }} />{origin_name}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", }}>
                                            <span>{origin_name}</span>
                                            <span style={{ margin: "0 4px" }}>-</span>
                                            <span>{renderFileSize(fileInfo?.size)}</span>
                                        </div>
                                    </div>
                                </a>
                            }
                        }
                    </OnHover>
                }

                {children}
            </React.Fragment>
    }
}
