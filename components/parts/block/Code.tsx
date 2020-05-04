import * as React from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'
import { BlockData } from '.'

export type CodeType = "code-line" | "code" | "code-tab"

export const RenderCode: React.FC<{ type: CodeType; children: any, data?: BlockData; }> = ({ type, children, data }) => {
    const childs = React.Children.toArray(children)
    let codeContent = ``;
    childs.forEach((c: any) => {
        const text = c?.props?.children?.props?.children
        !!text && (codeContent += `${text}\n`)
    })
    switch (type) {
        case "code":
            return <div style={{ width: "100%" }}>
                <CopyBlock
                    text={codeContent}
                    language={data?.syntax || undefined}
                    showLineNumbers
                    theme={dracula}
                    codeBlock
                />
            </div>
        case "code-line":
            return null
        case "code-tab":
            return <div>
                none-code-tab
                {children}
            </div>
        default:
            return null;
    }
}
