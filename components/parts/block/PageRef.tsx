import * as React from 'react'
import { BlockData } from '.'
import { OnHover } from '@lib/OnHover.tsx'
import { message } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

export type PageRefType = "page-ref"

export const RenderPageRef: React.FC<{
    type: PageRefType;
    data?: BlockData;
}> = ({ type, children, data }) => {
    switch (type) {
        case 'page-ref':
            const pageInfo = findPage(data?.page)
            return <React.Fragment>
                <PageLink pageInfo={pageInfo} link={data?.page} />
                {children}
            </React.Fragment>
        default:
            return null
    }
}

const PageLink: React.FC<{ pageInfo?: PageInfo; link?: string }> = ({ pageInfo, link }) => {
    if (!pageInfo) {
        return <div>
            error ref:{link}
        </div>
    }
    return <OnHover>
        {
            onHover => {
                return <a onClick={() => message.success('正在下载...')} style={{ color: "#FFD139" }} href={`./${pageInfo.path}.html`}>
                    <div style={{ border: `1px solid ${onHover ? "#FFD139" : "#e2e9ef"}`, borderRadius: "3px", padding: "16px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", }}>
                            <ArrowRightOutlined style={{ fontSize: "24px", marginRight: "16px" }} />
                            {pageInfo.title}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", color: "#9DAAB6", fontSize: "12px" }}>
                            <span>/{pageInfo.title}</span>
                        </div>
                    </div>
                </a>
            }
        }
    </OnHover>
}

function findPage(key?: string): PageInfo | undefined {
    if (!key) {
        return undefined
    }
    if (pageRoutes?.page?.uid === key) {
        return pageRoutes?.page
    } else {
        return mapPageInfo(pageRoutes?.page, key)
    }
}

function mapPageInfo(page: PageInfo, key: string): PageInfo | undefined {
    if (!page) {
        return undefined
    }

    const targetPage = page.pages.find(p => p.uid === key)
    if (!!targetPage) {
        return targetPage
    }

    for (let i = 0; i < page.pages.length; i++) {
        if (!!page.pages?.length && mapPageInfo(page.pages[i], key)) {
            return mapPageInfo(page.pages[i], key)
        }
    }
}