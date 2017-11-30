import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {Router, Route, IndexRoute, Switch} from 'react-router-dom'
import RoleEdit from './edit'
import RoleDelete from './delete'
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
        $t.history.push('/'); /*初始化时指向根目录*/

        $t.setGridInitParam({
            url             : $t.encodeUrl('findPage'),
            baseUrl         : $t.baseUrl,
            gridName        : this.moduleName,
            inlineEdit      : true,
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
                u.get($t.encodeUrl('findRoleMenuList?roleId='+row.id),(bean)=>{
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
                <JqgridWrapper options={this.gridOptions} ref="grid"/>
                <Router history={this.history}>
                    <Switch>
                        <Route path="/edit"         component={RoleEdit}/>
                        <Route path="/allocation"   component={RoleAllcationForm}/>
                        <Route path="/delete"       component={RoleDelete}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

const NoMatch = ({location}) => {
    // notification.error({message:`路由匹配出错:${location.pathname}`});
    console.warn(`路由匹配出错:${location.pathname}`);
    return null;
};
