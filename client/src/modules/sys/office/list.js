import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import OfficeForm from './edit'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel  from './colModel'

export  default  class SysOffice extends BaseComponent{

    constructor(props) {
        super(props);

        let $t = this,u=this.u;
        $t.extend("List");

        $t.baseUrl      = '/api/office/'   ;
        $t.titlePrefix = "机构";
        $t.moduleName  = 'sysOffice';
        $t.editForm = OfficeForm;
        $t.setGridInitParam({
            url             : 'api/office/findTree',
            baseUrl         : $t.baseUrl,
            gridName        : this.moduleName,
            treeGrid        : true,
            muiltSelect     : true,
            ExpandColumn    : 'name',
            ExpNum          : 8,
            pagerAble       : true,
            rownumbers      : false,
            colModel        : colModel,
            ondblClickRow   :null
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
            reload: true,
            right: {
                items: [
                    {name: '添加', path: '/add', icon: 'plus',},
                    {name: '插入', path: '/add', icon: 'plus-square-o',},
                    {name: '修改', path: '/edit', icon: 'edit',},
                    {name: '删除', path: '/delete', icon: 'delete',   }
                ]
            }
        };

        $t.regEvent("保存",'save',()=>{
           let list =  $t.saveEditList();
           if(list){
               u.post($t.geBaseUrl('saveBatch'),{list}, data=>data.code===0?$t.reload():null);
           }
        });
    }

    render() {
        return (
            <div className="my-col-full">
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register}/>
                <JqgridWrapper options={this.gridOptions} ref="grid"/>
            </div>
        )
    }
}

