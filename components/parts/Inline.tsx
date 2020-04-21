import * as React from 'react';

interface LinkData {
    href: string
}

type LinkType<T> = {
    type: 'link'
    data: LinkData
} & T

export const Inline: React.SFC<LinkType<Partial<{
    children: any
}>>> = ({ data, type, children }) => {
    const base = <div>
        {children}
    </div>
    switch (type) {
        case "link":
            return renderLinkContainer(data, base);
        default:
            return base
    }
}


const renderLinkContainer = (data: LinkData, child: JSX.Element) => {
    const [showUnderLine, setShowUnderLine] = React.useState(false)
    return <div
        onMouseEnter={e => setShowUnderLine(true)}
        onMouseLeave={e => setShowUnderLine(false)}
        style={{
            cursor: "pointer",
            color: "rgb(255, 209, 57)",
            display: "inline-block",
            position: "relative"
        }}
        onClick={() => {
            window.open(data.href)
        }}>
        {child}
        {showUnderLine && <div style={{ width: "100%", position: "absolute", bottom: 0, borderBottom: "0.8px solid rgb(255, 209, 57)" }} />}
    </div>
}