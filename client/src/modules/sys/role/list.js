import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import RoleEdit from './edit'
import RoleAllcationForm from './allocation'
import {findDOMNode} from 'react-dom'
import BaseComponent from "../../base/BaseComponent"
import Ztree from "../../base/Ztree"
import colModel  from './colModel'

export default class SyseRole extends BaseComponent{

    constructor(props) {
        super(props);

        let $t = this,u=this.u;

        $t.extend("List");

        $t.baseUrl      = '/api/role/'   ;
        $t.moduleName   = 'sys_role'     ;
        $t.titlePrefix = "模型";
        $t.editForm = RoleEdit;

        $t.setGridInitParam({
            url             : $t.geBaseUrl('findPage'),
            baseUrl         : $t.baseUrl,
            gridName        : this.moduleName,
            muiltSelect     : true,
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
                    {name: '添加', path: '/add', icon: 'plus'},
                    {name: '修改', path: '/edit', icon: 'edit'},
                    {name: '授权', path: '/allocation', icon: 'share-alt'},
                    {name: '删除', path: '/delete', icon: 'delete'  }
                ]
            }
        };

        $t.regDialog('/allocation',"授权",row=>{
            return new Promise((res,rej)=>{
                let u = this.u;
                u.get($t.geBaseUrl('findRoleMenuList?roleId='+row.id),(bean)=>{
                    let selectedKeys =[];
                    bean.data.forEach(item=>selectedKeys.push(item.menuId));
                    bean.success()?res({selectedKeys}):rej(bean);
                })
            })
        });
    }

    render() {
        return (
            <div className="my-col-full">
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register}/>
                <JqgridWrapper options={this.gridOptions} />
            </div>
        )
    }
}