import * as React from 'react'

export type HeadType = "heading-1" | "heading-2" | "heading-3"

export const renderHead = (type: HeadType, children: any) => {
    switch (type) {
        case "heading-1":
            return <div style={{ fontSize: "24px", color: "#242A31", fontWeight: 700, lineHeight: 1.5, padding: "24px 0", borderTop: "1px solid #E6ECF1",marginTop:"24px" }}>
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
