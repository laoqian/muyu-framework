import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../containers/toolBar'
import JqgridWrapper from '../../../layouts/grid'
import {Router, Route,IndexRoute} from 'react-router-dom'
import MenuEdit from './edit'
import MenuDelete from './delete'
import createHistory from 'history/createBrowserHistory'
import {notification } from 'antd';

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
                    let grid =$('#dataGrid');
                    let id =grid.getGridParam('selrow');

                    if(!id){
                        return notification.error({message:'未选择,要修改的用户'});
                    }else {
                        notification.success({message:'编辑用户：'+id});
                    }

                    return this.history.push('/edit/'+id);
                case '添加':
                    return this.history.push('/edit');
                case '删除':
                    return  this.history.push('/delete')
            }
        };
    }

    render() {
        return (
            <Router history= {this.history}>
                <div className="my-col-full">
                    <ToolBar options={this.toolBarOptions}/>
                    <JqgridWrapper options={this.options}/>
                    <Route path="/edit/:id" component= {MenuEdit}/>
                    <Route path="/delete" component= {MenuDelete}/>
                </div>
            </Router>
        )
    }
}


function mapStateToProps(state) {
    return {
    }
}

function mapActionToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapActionToProps)(SyseMenu);

