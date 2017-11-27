import React from 'react'
import ReactDom from 'react-dom'
import BaseComponent from './BaseComponent'
import {Select} from 'antd'
import Ztree from './Ztree'

export default class ZtreeSelect extends BaseComponent{
    constructor(props){
        super(props);
        let $t = this;
        $t.regEvent("didMount",()=>{
            let select  = ReactDom.findDOMNode($t.refs.select);
            $('.ant-select-selection',select).click(()=>{
                $($t.container).hide();
                Ztree.open({url:$t.encodeBaseUrl('/menu/findTreeNode'),});
            })
        });

        $t.container =  document.createElement('div');
        document.body.appendChild($t.container);
    }

    componentWillUnmount(){
        document.body.removeChild(this.container);
    }
    render (){
        return <Select ref="select"  getPopupContainer={()=>this.container} placeholder={"==请选择=="}/>
    }
}