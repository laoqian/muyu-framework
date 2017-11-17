import React from 'react'
import {Form} from 'antd';
import BaseComponent from "../../base/BaseComponent";

class MenuForm extends BaseComponent {
    constructor(props) {
        super(props);
        
        this.extend("Form");
        this.baseUrl      = '/api/menu/';
        this.groupNum     = 2;
        this.moduleName   = "用户";
        this.colModel     = colModel;
        this.style ={width:'800px',height:'460px'};
    }
}

export default Form.create()(MenuForm);


