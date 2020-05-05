import * as React from 'react';
import { mergeClassName } from '@lib/mergeClassName';

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
            return <Container className="textTypeBold">
                {RenderMarkContainer(marks, child)}
            </Container>
        case 'code':
            return <Container className="textTypeCode">
                {RenderMarkContainer(marks, child)}
            </Container>
        case 'italic':
            return <Container className="textTypeItalic">
                {RenderMarkContainer(marks, child)}
            </Container>
        case 'strikethrough':
            return <Container className="textTypeStrikethrough">
                {RenderMarkContainer(marks, child)}
            </Container>
    }
}

const Container: React.FC<{
    children?: any
    className?: string
}> = ({ children, className }) => {
    return <div className={mergeClassName(['defaultStyle', className])}> {children}</div >
}