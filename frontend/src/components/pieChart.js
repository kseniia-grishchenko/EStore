import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

function DemoPie(){
    const data = [
        {
            type: 'Eye patch',
            value: 6,
        },
        {
            type: 'Lip patch',
            value: 2,
        },
        {
            type: 'Foot patch',
            value: 1,
        },
        {
            type: 'Face mask',
            value: 4,
        },
    ];
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

