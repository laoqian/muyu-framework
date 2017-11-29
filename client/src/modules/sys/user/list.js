import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {Router, Route,IndexRoute,Switch} from 'react-router-dom'
import DictEdit from './edit'
import DictDelete from './delete'
import AuthForm from './auth'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel from './colModel'

export default class SysUser extends BaseComponent{

    constructor(props){
        super(props);

        let $t = this;

        $t.extend("List");
        $t.baseUrl    = '/api/user/';
        $t.moduleName = 'sysUser';
        $t.history.push('/');

        $t.setGridInitParam({
            url:$t.encodeUrl('findPage'),
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
                    {name: '修改',path:'/edit',  icon: 'edit',    },
                    {name: '授权',path:'/auth',  icon: 'edit',    },
                    {name: '删除',path:'/delete',icon: 'delete',  },
                ]
            }
        };

        $t.regDialog('/auth',"授权",row=>{
            return new Promise((res,rej)=>{
                let u = this.u;
                u.get($t.encodeUrl('findUserRoleList?userId='+row.id),(bean)=>{
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
                <JqgridWrapper options={this.gridOptions} ref="grid"/>
                <Router history= {this.history}>
                    <Switch>
                        <Route path="/edit"     component= {DictEdit}/>
                        <Route path="/delete"   component= {DictDelete}/>
                        <Route path="/auth"     component= {AuthForm}/>
                        <Route                  component= {NoMatch}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

const NoMatch = ({ location }) => {
    console.warn(`路由匹配出错:${location.pathname}`);
    return null;
};
