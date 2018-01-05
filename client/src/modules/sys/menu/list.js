import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import MenuForm from './edit'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel  from './colModel'

export  default  class SysMenu extends BaseComponent{

    constructor(props) {
        super(props);

        let $t = this,u=this.u;
        $t.extend("List");

        $t.baseUrl      = '/api/menu/'   ;
        $t.moduleName   = 'sysMenu'     ;
        $t.titlePrefix = "菜单";
        $t.editForm = MenuForm;

        $t.setGridInitParam({
            url             : 'api/menu/findTree',
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
                    {name: '保存', path: '/save'  , icon: 'save',     },
                    {name: '删除', path: '/delete', icon: 'delete',   }
                ]
            }
        };

        $t.regEvent("保存",'save',()=>{
           if($t.saveEditList()){
               u.post($t.geBaseUrl('saveBatch'),{list:$t.editList}, data=>data.code===0?$t.reload():null);
           }
        });
    }

    render() {
        return (
            <div className="my-col-full">
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register}/>
                <JqgridWrapper options={this.gridOptions}/>
            </div>
        )
    }
}

const NoMatch = ({location}) => {
    console.warn(`路由匹配出错:${location.pathname}`);
    return null;
};
