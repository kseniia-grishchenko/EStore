import React from "react";
import ReactExport from "react-export-excel";
import Button from 'react-bootstrap/Button';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export const ExportReact = ({dataSet}) => {
    return (
        <ExcelFile element={<Button variant="warning">Export</Button>}>
            <ExcelSheet data={dataSet} name="Products">
                <ExcelColumn label="_id" value="_id"/>
                <ExcelColumn label="name" value="name"/>
                <ExcelColumn label="price" value="price"/>
                <ExcelColumn label="description" value="description"/>
                <ExcelColumn label="category" value="category"/>
                <ExcelColumn label="brand" value="brand"/>
            </ExcelSheet>
        </ExcelFile>
    )
}