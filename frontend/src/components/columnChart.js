import React from "react";
import { Column } from '@ant-design/charts';

function DemoColumn({orderItems}) {

    const data = []
    orderItems && Object.entries(orderItems).forEach(([key, value]) =>
        data.push({
            type: key,
            sales: value
        }))
    const config = {
        data: data,
        xField: 'type',
        yField: 'sales',
        columnWidthRatio: 0.8,
        meta: {
            type: { alias: "type" },
            sales: { alias: "sales" },
        },
    };
    return (
        <div style={{width: "100%"}}>
            <Column {...config} />
            <h6 style={{textAlign: "center", marginTop: "3%"}}>Most popular ordered products</h6>
        </div>
        )
}

export default DemoColumn