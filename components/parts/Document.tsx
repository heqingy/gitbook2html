import * as React from 'react';
import { findPage } from '@lib/findPage.ts'

export const Document: React.SFC<Partial<{
    type: string
}>> = props => {
    React.useEffect(() => {
        document.body.style.fontFamily = "Content-font, Roboto, sans-serif"
        document.body.style.color = "#3b454e"
    }, [])
    return <div style={styles.layout}>
        <div style={{ marginBottom: "32px", padding: "40px 0", borderBottom: "2px solid rgb(230, 236, 241)" }}>
            <div style={styles.title}>{findPage(pageName, 'path')?.title || "我是固定的标题"}</div>
            <div style={styles.desc}>{findPage(pageName, 'path')?.description || "我是一些摘要"}</div>
        </div>
        {props.children}
    </div>
}



const styles: Record<
    'layout' | 'title' | 'desc'
    , React.CSSProperties> = {
    layout: {
        backgroundColor: "whtie",
        padding: "0 88px",
        width: "100%"
    },
    title: {
        fontSize: "32px",
        fontWeight: 500,
        lineHeight: 1.5,
        color: "#242a31"
    },
    desc: {
        marginTop: "8px",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: 1.625,
        color: "rgb(116,129,141)"
    }
}