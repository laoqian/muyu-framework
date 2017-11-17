import React from 'react'
import {Form} from 'antd';
import BaseComponent from '../../base/BaseComponent'
import colModel from './colModel'

class UserEditForm extends BaseComponent{
    constructor(props) {
        super(props);
        let $t  = this;

        $t.extend("Form");

        $t.baseUrl      = '/api/user/';
        $t.groupNum     = 2;
        $t.moduleName   = "用户";
        $t.colModel     = colModel;
        $t.style ={width:'800px',height:'460px'};
    }
}

export default Form.create()(UserEditForm);


