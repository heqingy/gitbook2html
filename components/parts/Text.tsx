import * as React from 'react';

type MarkTypes = "italic" | "bold" | "strikethrough" | "code"

interface Mark {
    kind: "mark",
    data: any,
    type: MarkTypes
}

export const Text: React.SFC<Partial<{
    type: string
    marks: Mark[]
    children?: any
}>> = ({ marks = [], type, children }) => {
    const isText = typeof children === 'string'
    if (!children) return null
    return <Container>
        {!!isText && (!!marks.length ? RenderMarkContainer(marks, children) : children)} &nbsp;
        {!isText && children}
    </Container>
}

function RenderMarkContainer(marks: Mark[], child?: any) {
    if (!marks.length) {
        return child
    }
    switch (marks.shift()?.type) {
        case 'bold':
            return <Container style={styles.textTypeBold}>
                {RenderMarkContainer(marks, child)}
            </Container>
        case 'code':
            return <Container style={styles.textTypeCode}>
                {RenderMarkContainer(marks, child)}
            </Container>
        case 'italic':
            return <Container style={styles.textTypeItalic}>
                {RenderMarkContainer(marks, child)}
            </Container>
        case 'strikethrough':
            return <Container style={styles.textTypeStrikethrough}>
                {RenderMarkContainer(marks, child)}
            </Container>
    }
}

const Container: React.FC<{
    children?: any
    style?: React.CSSProperties
}> = ({ children, style = {} }) => {
    return <div style={{ ...Object.assign({}, styles.defaultStyle, style) }}> {children}</div >
}

const styles: Record<
    "textTypeItalic" | "textTypeBold" | "textTypeStrikethrough" | "textTypeCode" | "defaultStyle"
    , React.CSSProperties> = {
    defaultStyle: {
        lineHeight: 1.625,
        display: "inline-block"
    },
    textTypeItalic: {
        fontStyle: "italic"
    },
    textTypeBold: {
        fontWeight: 700
    },
    textTypeStrikethrough: {
        textDecoration: "line-through"
    },
    textTypeCode: {
        backgroundColor: "rgb(245,247,249)",
        padding: "3px 6px",
        borderRadius: "3px",
        margin: "0px 1px"
    },
}