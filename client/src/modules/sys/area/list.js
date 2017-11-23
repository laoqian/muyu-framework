import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {Router, Route, IndexRoute, Switch} from 'react-router-dom'
import AreaForm from './edit'
import AreaDelete from './delete'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel  from './colModel'

export  default  class SysArea extends BaseComponent{

    constructor(props) {
        super(props);

        let $t = this,u=this.u;
        $t.extend("List");

        $t.baseUrl      = '/api/area/'   ;
        $t.moduleName   = 'sys_area'     ;
        $t.history.push('/'); /*初始化时指向根目录*/

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
                    // {name: '添加', path: '/add', icon: 'plus',},
                    // {name: '插入', path: '/add', icon: 'plus-square-o',},
                    // {name: '修改', path: '/edit', icon: 'edit',},
                    {name: '保存', path: '/save'  , icon: 'save',     },
                    {name: '删除', path: '/delete', icon: 'delete',   }
                ]
            }
        };

        $t.regEvent("保存",'save',()=>{
           let list =  $t.saveEditList();
           if(list){
               u.post($t.encodeUrl('saveBatch'),{list},data=>data.code===0?$t.reload():null);
           }
        });
    }

    render() {
        return (
            <div className="my-col-full">
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register}/>
                <JqgridWrapper options={this.gridOptions} ref="grid"/>
                <Router history={this.history}>
                    <Switch>
                        <Route path="/edit" component={AreaForm}/>
                        <Route path="/delete" component={AreaDelete}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

const NoMatch = ({location}) => {
    console.warn(`路由匹配出错:${location.pathname}`);
    return null;
};
