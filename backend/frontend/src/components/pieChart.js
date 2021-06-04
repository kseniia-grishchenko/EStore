import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

function DemoPie({ categories }){

    const data = []
    Object.entries(categories).forEach(([key, value]) =>
    data.push({
        type: key,
        value: value
    }))

    const config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(_ref) {
                const percent = _ref.percent;
                return ''.concat((percent * 100).toFixed(), '%');
            },
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [{ type: 'element-active' }],
    };
    return(
    <div>
        <Pie {...config} />
        <h6 style={{textAlign: "center", marginTop: "3%", marginBottom: "8%"}}>Distribution of products by categories</h6>
    </div>
    )
}

export default DemoPie

