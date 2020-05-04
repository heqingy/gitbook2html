import * as React from 'react'
import { OnHover } from '@lib/OnHover.tsx'

export const Nav: React.FC = ({ children }) => {
    return <div style={{ display: "flex", flexDirection: "row" }}>

        <div style={{minHeight: "100vh", backgroundColor: "#F5F7F9", paddingLeft: "24px", width: "280px", paddingTop: "50px", borderRight: "1px solid #E6ECF1" }}>
            <NavItem page={pageRoutes.page} />
            {pageRoutes.page.pages.map(renderNav)}
        </div>

        {children}
    </div>
}

const renderNav = (page: PageInfo) => {
    return <React.Fragment>
        <NavItem page={page} />
        {!!page?.pages?.length && page.pages.map(renderNav)}
    </React.Fragment>
}

const NavItem: React.FC<{ page: PageInfo }> = ({ page }) => {
    const onSelect = pageName === page.path
    const onSelectStyle: React.CSSProperties = onSelect ? {
        border: "1px solid #E6ECF1",
        borderRight: "none",
        backgroundColor: "white",
        color: "#FFD139"
    } : {}
    return <OnHover onPress={() => location.assign(`${page.path}.html`)}>
        {onHover => {
            return <div style={{
                padding: "7px 24px 7px 16px",
                cursor: "pointer",
                ...onSelectStyle,
                ...onHover && !onSelect ? { backgroundColor: "#e2e9ef" } : {}
            }}>
                {page.title}
            </div>
        }}
    </OnHover>
}