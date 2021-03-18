import React from "react";
import { Column } from '@ant-design/charts';

function DemoColumn() {
    const data = [
        {
            type: 'Eye Patch Gold',
            sales: 18,
        },
        {
            type: 'Mask City',
            sales: 5,
        },
        {
            type: 'Mask Caviar',
            sales: 3,
        },
        {
            type: 'Eye Patch Lavande',
            sales: 7,
        },
        {
            type: 'Eye Patch Aloe',
            sales: 3,
        },
    ];
    const config = {
        data: data,
        xField: 'type',
        yField: 'sales',
        columnWidthRatio: 0.8,
        meta: {
            type: { alias: '类别' },
            sales: { alias: '销售额' },
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