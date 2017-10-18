import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../containers/toolBar'
import JqgridWrapper from '../../../layouts/grid'
import {Router, Route,IndexRoute,Switch} from 'react-router-dom'
import MenuEdit from './edit'
import MenuDelete from './delete'
import createHistory from 'history/createBrowserHistory'
import {notification,Modal } from 'antd';
import {findDOMNode} from 'react-dom';

class SyseMenu extends Component{

    constructor() {
        super();

        this.history = createHistory({basename:'#user'});
        this.options = {};

        this.toolBarOptions = {
            sync: false,

            leftTools: {
                items: [
                    {
                        name: 'username', type: 'input', text: '登录名:', palaceHolder: '登录名',
                        rules: [{
                            required: true, message: '登录名不能为空!',
                        }],
                    },
                    {name: 'type', type: 'select', options: {11: 111, 22: 333}, default: '', text: '类型:'}
                ],
                searchBtn: {
                    text: '查询',
                    icon: 'search'
                }
            },
            rightTools:{
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
                        return notification.error({message:'未选择,要修改的用户'});
                    }else {
                        notification.success({message:'编辑用户：'+id});
                    }

                    return this.history.push('/edit/'+id);
                case '添加':
                    return this.history.push('/add');
                case '删除':
                    return  this.history.push('/delete')
            }
        };
    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar options={this.toolBarOptions}/>
                <JqgridWrapper options={this.options} ref="grid"/>
                <Router history= {this.history}>
                    <Switch>
                        <Route path="/edit/:id" component= {MenuEdit}/>
                        <Route path="/add"      component= {MenuEdit}/>
                        <Route path="/delete"   component= {MenuDelete}/>
                        <Route                  component={NoMatch}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

const NoMatch = ({ location }) => {
    notification.error({message:`路由匹配出错:${location.pathname}`});
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

