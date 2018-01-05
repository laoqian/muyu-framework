import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import AreaForm from './edit'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel  from './colModel'

export  default  class SysArea extends BaseComponent{

    constructor(props) {
        super(props);

        let $t = this,u=this.u;
        $t.extend("List");

        $t.baseUrl      = '/api/area/';
        $t.titlePrefix  = "区域";
        $t.moduleName   = 'sysArea';
        $t.editForm     = AreaForm;

        $t.setGridInitParam({
            url             : 'api/area/findTree',
            baseUrl         : $t.baseUrl,
            gridName        : this.moduleName,
            treeGrid        : true,
            inlineEdit      : true,
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
                    {name: '保存',  icon: 'save',     },
                    {name: '删除',  icon: 'delete',   }
                ]
            }
        };

        $t.confirm('保存','是否保存区域编辑？',()=>{
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