import React from 'react'
import {Form} from 'antd';
import FormComponent from '../../base/Form'
import colModel from './colModel'

class UserEditForm extends FormComponent{
    constructor(props) {
        super(props);
        let $t  = this;

        $t.state = {
            editData :null,
            submiting:false
        };

        $t.baseUrl      = '/api/user/';
        $t.groupNum     = 2;
        $t.moduleName   = "用户";
        $t.colModel     = colModel;
        $t.style ={width:'800px',height:'460px'};
    }
}

export default Form.create()(UserEditForm);


