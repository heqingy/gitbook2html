import * as React from 'react'
import { BlockData } from '.'
import { Row, Col } from 'antd'

export type TableType = "table" | "table-row" | "table-cell"

export const RenderTable: React.FC<{
    type: TableType;
    data?: BlockData;
}> = ({ type, children, data }) => {
    switch (type) {
        case 'table':
            return <div style={{ marginBottom: "20px" }}>
                {
                    React.Children.map(children, (child: any, idx) => {
                        return React.cloneElement(child, { data: Object.assign({}, data, { isFirst: idx === 0 }) })
                    })
                }
            </div>
        case 'table-row':
            return <Row style={{
                display: "flex",
                borderBottom: `${(data as any)?.isFirst ? '2px' : "1px"} solid rgba(157,170,182,0.4)`,
            }}>
                {
                    React.Children.map(children, (child, idx) => {
                        return <Col
                            span={24 / React.Children.toArray(children).length}
                            style={{ alignItems: data?.aligns?.[idx] || 'left' }}
                        >
                            {child}
                        </Col>
                    })
                }
            </Row>
        case 'table-cell':
            return <div style={{ padding: "8px" }}>
                {children}
            </div>
        default:
            return null
    }
}