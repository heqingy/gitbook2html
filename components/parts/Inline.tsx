import * as React from 'react';
import { style } from 'typestyle'
import { findPage } from '@lib/findPage';

interface LinkData {
    href?: string
    code?: string
    assetID?: string
    formula?: string
    pageID?: string
}

type LinkType<T> = {
    type: 'link' | 'emoji' | 'inline-image' | 'inline-math'
    data?: LinkData
} & T

export const Inline: React.SFC<LinkType<Partial<{
    children: any
}>>> = ({ data, type, children }) => {
    const emoji = data?.code && eval("'" + `&#x${data?.code};`.replace(/&#x(.*?);/g, "\\u$1") + "'")
    switch (type) {
        case "emoji":
            return <span>
                <span style={{ marginRight: "8px" }}>{emoji}</span>
                {children}
            </span>
        case "link":
            return renderLinkContainer(data, children);
        case "inline-image":
            return <span>
                none-inline-image
                {children}
            </span>
        case "inline-math":
            return <span>
                none-inline-math
                {children}
            </span>
        default:
            return children
    }
}


const renderLinkContainer = (data?: LinkData, child?: JSX.Element) => {
    const [showUnderLine, setShowUnderLine] = React.useState(false)
    return <div
        onMouseEnter={e => setShowUnderLine(true)}
        onMouseLeave={e => setShowUnderLine(false)}
        className={styles.clearPTagStyle}
        style={{
            cursor: "pointer",
            color: "rgb(255, 209, 57)",
            display: "inline-block",
            position: "relative",
            lineHeight: "26px"
        }}
        onClick={() => {
            const pageInfo = findPage(data?.pageID)
            if (!!data?.pageID && !data?.href && !!pageInfo) {
                location.assign(`./${pageInfo.path}.html`)
                return;
            }
            window.open(data?.href)
        }}>
        {child}
        {showUnderLine && <div style={{ width: "100%", position: "absolute", bottom: "6px", borderBottom: "1px solid rgb(255, 209, 57)" }} />}
    </div>
}

const styles = {
    clearPTagStyle: style({
        $nest: {
            "&>p": {
                display: "inline"
            }
        }
    })
}