import * as React from 'react'
import { CopyBlock, dracula } from '@lib/codeBlock/index.js'
import { BlockData } from '.'

export type CodeType = "code-line" | "code" | "code-tab"

export const RenderCode: React.FC<{ type: CodeType; children: any, data?: BlockData; }> = ({ type, children, data }) => {
    if (type === 'code') {
        const childs = React.Children.toArray(children) || []

        return <React.Fragment>
            {childs.map((codeTab: any, idx) => {
                let codeContent = ``;
                if (!!codeTab?.props?.children?.length) {
                    (codeTab?.props?.children || [])?.forEach((codeLine: any) => {
                        const text = codeLine?.props?.children?.props?.children
                        !!text && (codeContent += `${text}\n`)
                    })
                }
                codeContent += codeTab?.props?.children?.props?.children?.props?.children || ""
                
                return <div style={{ width: "100%" }} key={idx}>
                    <CopyBlock
                        text={codeContent}
                        language={codeTab?.props?.data?.syntax || undefined}
                        showLineNumbers
                        theme={dracula}
                        codeBlock
                    />
                </div>
            })}
        </React.Fragment>
    }
    return null
}