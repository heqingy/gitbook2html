import * as React from 'react'
import { CopyBlock, dracula } from '@lib/codeBlock/index.js'
import { BlockData } from '.'
import { findChildType } from '@lib/findChildType'
import { style } from 'typestyle'

export type CodeType = "code-line" | "code" | "code-tab"

export const RenderCode: React.FC<{ type: CodeType; children: any, data?: BlockData; }> = ({ type, children, data }) => {
    if (type === 'code') {
        const childs: any[] = React.Children.toArray(children) || []

        if (findChildType(children, 'code-line')) {
            return (() => {
                let codeContent = ``;
                childs.forEach(child => {
                    const text = formatStrIndent(child?.props?.children?.props?.children)
                    codeContent += text ? `${text}\n` : '\n'
                })

                return <CodeBlock text={codeContent} language={data?.syntax || ""} />
            })()
        }

        if (findChildType(children, 'code-tab')) {
            return <React.Fragment>
                {childs.map((child: any, idx) => {
                    let codeContent = ``;

                    if (!!child?.props?.children?.length) {
                        (child?.props?.children || [])?.forEach((codeLine: any) => {
                            const text = formatStrIndent(codeLine?.props?.children?.props?.children)
                            !!text && (codeContent += `${text}\n`)
                        })
                    }
                    codeContent += child?.props?.children?.props?.children?.props?.children || ""

                    return <CodeBlock key={idx} text={codeContent} language={child?.props?.data?.syntax || ""} />
                })}
            </React.Fragment>
        }
    }
    return null
}

const CodeBlock: React.FC<{ text: string; language: string }> = ({ text, language }) => {
    return <div style={{
        fontWeight: 100, fontSize: "14px",
        padding: "12px 24px 24px 8px"
    }} className={style({
        $nest: {
            "button": {
                border: "1px solid transparent !important",
                cursor: "pointer"
            }
        }
    })}>
        <CopyBlock
            text={text}
            language={language}
            showLineNumbers
            theme={dracula}
            codeBlock
        />
    </div>
}

const formatStrIndent = (_str: string = "") => {
    let str = _str
    if (Array.isArray(_str)) {
        str = _str.join('')
    }
    let tmp = ``
    let lastForIndex = 0
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            tmp += `  `
        } else {
            lastForIndex = i
            break;
        }
    }
    return tmp + str.slice(lastForIndex)
}