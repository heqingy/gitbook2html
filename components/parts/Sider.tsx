import * as React from 'react'
import { OnHover } from '@lib/OnHover.tsx'
import RightOutlined from '@ant-design/icons/RightOutlined'
import DownOutlined from '@ant-design/icons/DownOutlined'

const getParentPath = (pages: Pages, targetPath: string): string | undefined => {
    for (let i = 0; i < pages?.length; i++) {
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
    const pageRoutes = reversion.versions[versionName]?.page;
    const parentPath = getParentPath(pageRoutes?.pages, targetPath || pageName)
    if (parentPath) {
        container.push(parentPath)
        getPathList(container, parentPath)
    }
}

const getPageInfo = (page: VersionInfo) => {
    const pathList: string[] = [pageName]
    getPathList(pathList)
    const onSelect = pathList[0] === page?.path
    const hasChildren = !!page?.pages?.length
    const onOpen = pathList.includes(page?.path) && hasChildren
    return {
        onSelect,
        onOpen,
        hasChildren,
    }
}

const formatPageRoutes = (p: VersionInfo, parentUid?: string) => {
    const { hasChildren } = getPageInfo(p)
    if (hasChildren) {
        (p?.pages || []).forEach(page => formatPageRoutes(page, p.path))
    }

    if (!!parentUid) {
        p['parentPath'] = parentUid
    }
}

formatPageRoutes(reversion.versions[versionName]?.page)

export const Sider: React.FC = ({ children }) => {
    const versionList = Object.keys(reversion.versions)
    const pageRoutes = reversion.versions[versionName]?.page;
    return <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ minWidth: "340px", minHeight: "100vh", backgroundColor: "#F5F7F9", width: "280px", paddingTop: "50px", borderRight: "1px solid #E6ECF1" }}>
            <GroupLayoutUI title={"versions"}>
                <IndentLayout>
                    {
                        versionList.map((v, idx) => {
                            return <SiderItemRenderUI
                                key={idx}
                                title={v}
                                path={location.pathname.split('versions/')[0] + `versions/${v}/${reversion.versions[v]?.page?.path}`}
                                onSelect={versionName === v}
                            />
                        })
                    }
                </IndentLayout>
            </GroupLayoutUI>
            {/* document index */}
            <IndentLayout>
                <SiderItemRenderUI title={pageRoutes?.title} path={pageRoutes?.path} onSelect={getPageInfo(pageRoutes)?.onSelect} />
            </IndentLayout>
            {renderSider(pageRoutes?.pages)}
        </div>
        {children}
    </div>
}

const renderSider = (pages: Pages = [], isSub?: boolean) => {
    return pages.map((page, idx) => {
        const content = isSub ? <SiderItem key={page.uid} page={page} itemStyle={{ color: "rgba(157,170,182,0.8)", marginLeft: "-1px" }} />
            : <IndentLayout key={page.uid} ><SiderItem page={page} /></IndentLayout>
        if (page.kind === 'group') {
            return <GroupLayout page={page} key={page.uid}>
                {renderSider(page.pages)}
            </GroupLayout>
        }
        return content
    })
}

const GroupLayout: React.FC<{ page: VersionInfo }> = ({ page, children }) => {
    return <GroupLayoutUI title={page.title} style={{ marginTop: "30px" }}>
        {children}
    </GroupLayoutUI>
}

const GroupLayoutUI: React.FC<{ title: string; style?: React.CSSProperties }> = ({ title, children, style = {} }) => {
    return <IndentLayout style={style}>
        <IndentLayout>
            <div style={{ fontWeight: 700, lineHeight: 1.2, fontSize: "12px", letterSpacing: "1.2px", fontFamily: "Content-font, Roboto, sans-serif", color: "rgba(157,170,182,0.8)" }}>
                {String(title).toLocaleUpperCase()}
            </div>
        </IndentLayout>
        {children}
    </IndentLayout>
}

const SiderItem: React.FC<{ page: VersionInfo, itemStyle?: React.CSSProperties }> = ({ page, itemStyle = {} }) => {
    return <div>
        <SiderItemRenderUI title={page?.title} path={page?.path} itemStyle={itemStyle} {...getPageInfo(page)} />
        {
            getPageInfo(page)?.onOpen && <IndentLayout style={{ paddingTop: 0 }}>
                <div style={{ borderLeft: "1px solid rgb(230, 236, 241)" }}>
                    {renderSider(page.pages, true)}
                </div>
            </IndentLayout>
        }
    </div>
}

const SiderItemRenderUI: React.FC<{
    title: string;
    path: string;
    itemStyle?: React.CSSProperties;
    onSelect?: boolean;
    hasChildren?: boolean;
    onOpen?: boolean;
}> = ({ title, path, onSelect, hasChildren, onOpen, itemStyle = {} }) => {
    const onSelectStyle: React.CSSProperties = onSelect ? {
        border: "1px solid #E6ECF1",
        borderRight: "none",
        backgroundColor: "white",
        color: "#FC6C04"
    } : {}
    const titleEle = <span>{title}</span>

    return <OnHover onPress={() => location.assign(`${path}.html`)}>
        {onHover => {
            return <div style={{
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "Content-font, Roboto, sans-serif",
                ...itemStyle,
                ...onSelectStyle,
                ...onHover && !onSelect ? { backgroundColor: "#e2e9ef" } : {}
            }}>
                <IndentLayout style={{ padding: "8px 0px 8px 16px" }}>
                    {
                        hasChildren ? <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingRight: "24px"
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
}

const IndentLayout: React.FC<{ style?: React.CSSProperties }> = ({ children, style = {} }) => {
    return <div style={{ padding: "4px 0px 4px 16px", ...style }}>{children}</div>
}