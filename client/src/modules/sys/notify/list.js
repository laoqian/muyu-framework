import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import UserEditForm from './edit'
import AuthForm from './reading'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel from './colModel'

export default class SysUser extends BaseComponent{

    constructor(props){
        super(props);

        let $t = this;

        $t.extend("List");
        $t.baseUrl    = '/api/notify/';
        $t.moduleName = 'sysNotify';
        $t.editForm = UserEditForm;
        $t.titlePrefix = "通知";

        $t.setGridInitParam({
            url:$t.getBaseUrl('findPage'),
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
                    {name: '添加',icon: 'plus',    },
                    {name: '修改',icon: 'edit',    },
                    {name: '删除',icon: 'delete',  },
                ]
            }
        };

        $t.regDialog('/auth',"授权",row=>{
            return new Promise((res,rej)=>{
                let u = this.u;
                u.get($t.getBaseUrl('findUserRoleList?userId='+row.id),(bean)=>{
                    let selectedKeys =[];
                    bean.data.forEach(item=>selectedKeys.push(item.roleId));
                    bean.success()?res({selectedKeys}):rej(bean);
                })
            })
        });
    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register} />
                <JqgridWrapper options={this.gridOptions}/>
            </div>
        )
    }
}
