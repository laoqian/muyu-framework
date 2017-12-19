import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {Router, Route,IndexRoute,Switch} from 'react-router-dom'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import DictEdit from './edit'
import DictDelete from './delete'
import colModel from './colModel'

export default class SysModel extends BaseComponent{

    constructor(props){
        super(props);

        let $t = this;

        $t.extend("List");
        $t.baseUrl    = '/api/process/';
        $t.moduleName = 'actProcess';
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
                    {name: '添加',path:'/add',        icon: 'plus',       },
                    {name: '修改',path:'/edit',       icon: 'edit',       },
                    {name: '编辑',path:'/modeler',    icon: 'edit',       },
                    {name: '发布',path:'/deploy',     icon: 'edit',       },
                    {name: '删除',path:'/delete',     icon: 'delete',     },
                ]
            }
        };


        $t.regDialog('/deploy',"发布",row=>{
            $t.u.get($t.encodeUrl('deploy?id='+row.id),bean=>console.log(bean));
        });

        $t.regDialog('/modeler',"编辑",row=>{
            window.open('./modeler.html?modelId='+row.id,row.name).focus();
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
