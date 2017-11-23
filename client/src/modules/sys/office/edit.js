import React from 'react'
import {Form} from 'antd';
import BaseComponent from "../../base/BaseComponent";
import colModel from './colModel'

class OfficeForm extends BaseComponent {
    constructor(props) {
        super(props);
        
        this.extend("Form");
        this.baseUrl      = '/api/menu/';
        this.moduleName   = "用户";
        this.colModel     = colModel;
        this.style ={width:'400px',height:'460px'};
    }
}

export default Form.create()(OfficeForm);


