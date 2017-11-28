import React from 'react'
import {Form} from 'antd';
import BaseComponent from "../../base/BaseComponent";
import colModel from './colModel'

class OfficeForm extends BaseComponent {
    constructor(props) {
        super(props);
        
        this.extend("Form");
        this.baseUrl      = '/api/menu/';
        this.groupNum     = 2;
        this.moduleName   = "机构";
        this.colModel     = colModel;
        this.style ={width:'800px',height:'360px'};

        this.saveData =()=>{
            let {getFieldValue} = this.props.form;
            let name = getFieldValue('name');
            let area = getFieldValue('area');
            console.log(name,area);
        }
    }
}

export default Form.create()(OfficeForm);


