import * as React from 'react'
import { BlockData } from '.'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export type TabsType = "tabs" | "tabs-item"

export const RenderTabs: React.FC<{
    type: TabsType;
    children: any;
    data?: BlockData
}> = ({ type, children, data }) => {
    switch (type) {
        case "tabs":
            return <Tabs>
                {
                    React.Children.map(children, (child, idx) => {
                        return <TabPane tab={child?.props?.data?.title} key={idx.toString()}>
                            {child}
                        </TabPane>
                    })
                }
                {children}
            </Tabs>
        default:
            return <div>{children}</div>
    }
}
