import * as React from 'react'
import { CopyOutlined } from '@ant-design/icons'
import { OnHover } from '@lib/onHover.tsx'
import { Tooltip } from 'antd'

export type CodeType = "code-line" | "code"

export const RenderCode: React.FC<{ type: CodeType; children: any }> = ({ type, children }) => {
    const [copied, setCopied] = React.useState(false)
    const childs = React.Children.toArray(children)
    let copyContent = '';
    childs.forEach((c: any) => {
        const text = c?.props?.children?.props?.children
        !!text && (copyContent += `${text}\n`)
    })
    switch (type) {
        case "code":
            return <div style={{
                borderRadius: "3px",
                padding: "24px",
                backgroundColor: "rgb(24,48,85)",
                position: "relative"
            }}>
                <textarea defaultValue={copyContent} style={{ opacity: 0, position: 'absolute' }} id="code"/>
                <OnHover onMouseLeave={() => setCopied(false)}>
                    {isEnter => {
                        return <div
                            style={{
                                position: "absolute",
                                right: '15px',
                                top: "15px",
                                cursor: "pointer",
                            }}>
                            <Tooltip title={copied ? 'copied!' : 'copy'}>
                                <CopyOutlined
                                    onClick={() => {
                                        var Url2 = document.getElementById("code") as any;
                                        Url2.select();
                                        document.execCommand("Copy");
                                        setCopied(true)
                                    }}
                                    style={{ color: 'rgba(157, 170, 182)', opacity: isEnter ? 1 : 0.6 }}
                                />
                            </Tooltip>
                        </div>
                    }}
                </OnHover>

                {childs.map((c: any, i) => {
                    if (childs.length === 1) {
                        return c
                    }
                    return <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <span style={{ color: "rgb(92, 105, 117)", marginRight: "14px", display: "block", fontSize: 11 }}>{i}</span>
                        <div>{c}</div>
                    </div>
                })}
            </div>
        case "code-line":
            return <div style={{
                color: "rgba(230, 236, 241,0.8)"
            }}>
                {children}
            </div>
        default:
            return null;
    }
}
