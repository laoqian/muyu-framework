import React from 'react'
import {Form} from 'antd';
import BaseComponent from '../../base/BaseComponent'
import colModel from './colModel'

class EditForm extends BaseComponent{
    constructor(props) {
        super(props);
        let $t  = this;

        $t.extend("Form");

        $t.baseUrl      = '/api/model/';
        $t.groupNum     = 1;
        $t.colModel     = colModel;
        $t.style = {width:'400px',height:'460px'};

        $t.saveData = ()=>$t.defaultSaveData('create','get');

    }
}

export default Form.create()(EditForm);


