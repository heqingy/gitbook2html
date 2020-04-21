import * as React from 'react';

type HeadType = "heading-1" | "heading-2" | "heading-3"
type BlockType = "paragraph"

export const Block: React.SFC<Partial<{
    type: HeadType | BlockType
    children: any
}>> = ({ type, children }) => {
    if (type?.startsWith("heading")) {
        return renderHead(type as HeadType, children)
    }

    return <div style={styles.layout}>{children}</div>
}


const renderHead = (type: HeadType, children: any) => {
    switch (type) {
        case "heading-1":
            return <div style={{ fontSize: "24px", color: "#242A31", fontWeight: 700, lineHeight: 1.5, padding: "24px 0", borderTop: "1px solid rgb(230, 236, 241)" }}>
                {children}
            </div>
        case "heading-2":
            return <div style={{ paddingBottom: "12px", fontSize: "20px", fontWeight: 700 }}>
                {children}
            </div>
        case "heading-3":
            return <div style={{ paddingBottom: "12px", fontSize: "16px", fontWeight: 700 }}>
                {children}
            </div>
    }
}


const styles: Record<
    "layout"
    , React.CSSProperties> = {
    layout: {
        marginBottom: "24px"
    }
}