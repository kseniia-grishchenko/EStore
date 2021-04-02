import React, { Component } from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

class ExcelReader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            cols: [],
        }
    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if(err){
                console.log(err);
            }
            else{
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows
                });
            }
        });

    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />
                <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
            </div>

        )
    }
}

export default ExcelReader;