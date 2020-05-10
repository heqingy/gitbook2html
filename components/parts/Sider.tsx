import * as React from 'react'
import { OnHover } from '@lib/OnHover.tsx'
import RightOutlined from '@ant-design/icons/RightOutlined'
import DownOutlined from '@ant-design/icons/DownOutlined'

const getParentPath = (pages: Pages, targetPath: string): string | undefined => {
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        if (page.path === targetPath) {
            return page.parentPath
        }

        if (!!page?.pages?.length) {
            const parentPath = getParentPath(page.pages, targetPath)

            if (parentPath) {
                return parentPath
            }
        }
    }
}

const getPathList = (container: string[], targetPath?: string) => {
    const parentPath = getParentPath(pageRoutes.page.pages, targetPath || pageName)
    if (parentPath) {
        container.push(parentPath)
        getPathList(container, parentPath)
    }
}

const getPageInfo = (page: PageInfo) => {
    const pathList: string[] = [pageName]
    getPathList(pathList)
    const onSelect = pathList[0] === page.path
    const hasChildren = !!page?.pages?.length
    const onOpen = pathList.includes(page.path)&&hasChildren
    return {
        onSelect,
        onOpen,
        hasChildren,
    }
}

const formatPageRoutes = (p: PageInfo, parentUid?: string) => {
    const { hasChildren } = getPageInfo(p)
    if (hasChildren) {
        (p?.pages || []).forEach(page => formatPageRoutes(page, p.path))
        return;
    }

    if (!!parentUid) {
        p['parentPath'] = parentUid
    }
}

formatPageRoutes(pageRoutes.page)

export const Sider: React.FC = ({ children }) => {
    return <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ minWidth: "340px", minHeight: "100vh", backgroundColor: "#F5F7F9", width: "280px", paddingTop: "50px", borderRight: "1px solid #E6ECF1" }}>
            {/* document index */}
            <IndentLayout>
                <SiderItem page={pageRoutes.page} />
            </IndentLayout>
            {renderSider(pageRoutes.page.pages)}
        </div>
        {children}
    </div>
}

const renderSider = (pages: Pages, isSub?: boolean) => {
    return pages.map(page => {
        const content = isSub ? <SiderItem page={page} itemStyle={{ color: "rgba(157,170,182,0.8)" }} />
            : <IndentLayout key={page.uid} ><SiderItem page={page} />
            </IndentLayout>
        if (page.kind === 'group') {
            return <GroupLayout page={page}>
                {renderSider(page.pages)}
            </GroupLayout>
        }
        return content
    })
}

const GroupLayout: React.FC<{ page: PageInfo }> = ({ page, children }) => {
    return <IndentLayout style={{ marginTop: "30px" }}>
        <IndentLayout>
            <div style={{ fontWeight: 700, lineHeight: 1.2, fontSize: "12px", letterSpacing: "1.2px", fontFamily: "Content-font, Roboto, sans-serif", color: "rgba(157,170,182,0.8)" }}>
                {String(page.title).toLocaleUpperCase()}
            </div>
        </IndentLayout>
        {children}
    </IndentLayout>
}

const SiderItem: React.FC<{ page: PageInfo, itemStyle?: React.CSSProperties }> = ({ page, itemStyle = {} }) => {
    const { onOpen, onSelect, hasChildren } = getPageInfo(page)

    const onSelectStyle: React.CSSProperties = onSelect ? {
        border: "1px solid #E6ECF1",
        borderRight: "none",
        backgroundColor: "white",
        color: "#FFD139"
    } : {}
    const title = <span>{page.title}</span>

    return <div>
        <OnHover onPress={() => location.assign(`${page.path}.html`)}>
            {onHover => {
                return <div style={{
                    cursor: "pointer",
                    fontSize: "14px",
                    fontFamily: "Content-font, Roboto, sans-serif",
                    ...itemStyle,
                    ...onSelectStyle,
                    ...onHover && !onSelect ? { backgroundColor: "#e2e9ef" } : {}
                }}>
                    <IndentLayout>
                        {
                            hasChildren ? <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingRight:"24px"
                            }}>
                                {title}
                                {
                                    onOpen ? <DownOutlined style={{ color: "rgba(157,170,182,0.8)" }} />
                                        : <RightOutlined style={{ color: "rgba(157,170,182,0.8)" }} />
                                }
                            </div> : title
                        }
                    </IndentLayout>
                </div>
            }}
        </OnHover>
        {
            onOpen && <IndentLayout style={{ paddingTop: 0 }}>
                <div style={{ borderLeft: "1px solid rgba(157,170,182,0.4)" }}>
                    {renderSider(page.pages, true)}
                </div>
            </IndentLayout>
        }
    </div>
}

const IndentLayout: React.FC<{ style?: React.CSSProperties }> = ({ children, style = {} }) => {
    return <div style={{ padding: "7px 0px 7px 16px", ...style }}>{children}</div>
}