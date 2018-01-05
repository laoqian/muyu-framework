import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import DictEdit from './edit'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel  from './colModel'

export default  class SyseDict extends BaseComponent{

    constructor(props){
        super(props);

        let $t = this;

        $t.extend('List');
        $t.baseUrl      = '/api/dict/'   ;
        $t.moduleName = 'sysDict';
        $t.titlePrefix = "字典";
        $t.editForm = DictEdit;

        $t.setGridInitParam({
            url:'api/dict/findPage',
            gridName:this.moduleName,
            colModel
        });

        $t.toolBarOptions = {
            left: {
                items: [
                    {
                        name: 'type', type: 'input', text: '类型:', palaceHolder: '类型',
                        rules: [],
                    }
                ],
                searchBtn: {
                    text: '查询',
                    icon: 'search'
                }
            },
            reload:true,
            right:{
                items :[
                    {name: '添加',path:'/add',   icon: 'plus',    },
                    {name: '删除',path:'/delete',icon: 'delete',  },
                    {name: '修改',path:'/edit',  icon: 'edit',    },
                ]
            }
        };
    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register} />
                <JqgridWrapper options={this.gridOptions} ref="grid"/>
            </div>
        )
    }
}