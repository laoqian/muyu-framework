import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd';
import BaseComponent from "../../base/BaseComponent";
import colModel  from './colModel'


class DictEditForm extends BaseComponent {
    constructor(props) {
        super(props);

        this.extend("Form");
        this.baseUrl    = "/api/dict/";
        this.moduleName = "字典";
        this.colModel   = colModel;
    }
}

export default  Form.create()(DictEditForm);
