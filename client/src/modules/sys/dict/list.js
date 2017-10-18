import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../containers/toolBar'
import JqgridWrapper from '../../../layouts/grid'
import {Router, Route,IndexRoute,Switch} from 'react-router-dom'
import DictEdit from './edit'
import DictDelete from './delete'
import createHistory from 'history/createBrowserHistory'
import {notification,Modal } from 'antd';
import {findDOMNode} from 'react-dom';

class SyseMenu extends Component{

    constructor() {
        super();
        
        this.moduleName = 'sysDict';
        this.history = createHistory({basename:'#user'});
        this.gridOptions = {
            url:'api/dict/findPage',
            gridName:this.moduleName,
            colModel: [
                {label: '键值', name: 'value', width: 200},
                {label: '标签', name: 'label', width: 150},
                {label: '类型', name: 'type', width: 150},
                {label: '描述', name: 'description', width: 150},
                {label: '排序', name: 'sort', width: 150}
            ],
        };

        this.toolBarOptions = {
            leftTools: {
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
            rightTools:{
                reload:true,
                gridName:this.gridOptions.gridName,
                items :[
                    {name: '添加',path:'/add',   icon: 'plus',    },
                    {name: '删除',path:'/delete',icon: 'delete',  },
                    {name: '修改',path:'/edit',  icon: 'edit',    },
                ]
            }
        };

        this.toolBarOptions.rightTools.click = item => {
            switch (item.name){
                case '修改':
                    let grid = $('.ui-jqgrid-btable',findDOMNode(this.refs.grid));
                    let id =grid.getGridParam('selrow');

                    if(!id){
                        return notification.error({message:'未选择,要修改的标签'});
                    }else {
                        notification.success({message:'编辑标签：'+id});
                    }

                    return this.history.push('/edit/'+id);
                case '添加':
                    return this.history.push('/add');
                case '删除':
                    return  this.history.push('/delete')
            }
        };

        this.history.push('/');
    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar options={this.toolBarOptions}/>
                <JqgridWrapper options={this.gridOptions} ref="grid"/>
                <Router history= {this.history}>
                    <Switch>
                        <Route path="/edit/:id" component= {DictEdit}/>
                        <Route path="/add"      component= {DictEdit}/>
                        <Route path="/delete"   component= {DictDelete}/>
                        <Route                  component={NoMatch}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

const NoMatch = ({ location }) => {
    // notification.error({message:`路由匹配出错:${location.pathname}`});
    console.warn(`路由匹配出错:${location.pathname}`);
    return null;
};

function mapStateToProps(state) {
    return {
    }
}

function mapActionToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapActionToProps)(SyseMenu);

