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
                <ExcelColumn label="Id" value="Id"/>
                <ExcelColumn label="Name" value="Name"/>
                <ExcelColumn label="Price" value="Price"/>
                <ExcelColumn label="Description" value="Description"/>
                <ExcelColumn label="Category" value="Category"/>
                <ExcelColumn label="Brand" value="Brand"/>
            </ExcelSheet>
        </ExcelFile>
    )
}