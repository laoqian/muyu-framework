import React from 'react'
import BaseComponent from "../../base/BaseComponent"
import colModel from './colModel'
import {Form} from 'antd';


class RoleAllcationForm extends BaseComponent {
    constructor(props) {
        super(props);

        let $t  = this;

        $t.extend("Form");

        $t.baseUrl      = '/api/role/';
        $t.moduleName   = "角色";
        $t.colModel     = colModel;
        $t.style ={width:'400px',height:'300px'};
    }
}


export default Form.create()(RoleAllcationForm);

