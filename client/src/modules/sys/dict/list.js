import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../containers/toolBar'
import JqgridWrapper from '../../../layouts/grid'
import {Router, Route,IndexRoute,Switch} from 'react-router-dom'
import DictEdit from './edit'
import DictDelete from './delete'
import createHistory from 'history/createBrowserHistory'
import {notification } from 'antd';
import {findDOMNode} from 'react-dom';

class SyseDict extends Component{

    constructor() {
        super();
        let self = this;

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
            ondblClickRow:()=>{
                self.editRow();
                self.isGridDbClick = true;
            },
            beforeSelectRow:(id)=>{
                let selectd = self.getSelectedId() !== id;
                if(!selectd){
                    setTimeout(()=>{
                        self.isGridDbClick?self.isGridDbClick = false:self.getGrid().resetSelection();
                    },200)
                }

                return selectd;
            }
        };

        this.isGridDbClick =false; /*解决jqGrid双击事件触发单击事件*/
        this.toolBarOptions = {
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
            right:{
                reload:true,
                items :[
                    {name: '添加',path:'/add',   icon: 'plus',    },
                    {name: '删除',path:'/delete',icon: 'delete',  },
                    {name: '修改',path:'/edit',  icon: 'edit',    },
                ]
            }
        };

        this.getGrid = ()=>$('.ui-jqgrid-btable',findDOMNode(this.refs.grid));
        this.getSelectedId =()=>this.getGrid().getGridParam('selrow');
        this.getSelRowData = ()=>{
            let id =   this.getSelectedId();
            if(!id){
                return null;
            }

            let row = this.getGrid().getRowData(id);

            row.id = id;
            return row;
        };

        this.editRow = ()=>{
            let row= this.getSelRowData();
            if(!row){
                return notification.error({message:'未选择,要修改的标签'});
            }else {
                notification.success({message:'编辑标签：'+row.id});
            }

            this.history.push({pathname:'/edit',type:'modify',row,grid:this.getGrid()});
        };

        this.addRow = ()=>{
            let row= this.getSelRowData();
            if(row){
                return this.history.push({pathname:'/edit',type:'add',row,grid:this.getGrid()});
            }else{
                return this.history.push({pathname:'/edit',type:'add',grid:this.getGrid()});
            }
        };

        this.deleteRow = ()=>this.history.push({pathname:'/delete',row:this.getSelRowData(),grid:this.getGrid()});
        this.reload = ()=>this.getGrid().trigger('reloadGrid');
        this.toolBarOptions.right.click = item => {
            switch (item.name){
                case '修改':
                    return this.editRow();
                case '添加':
                    return this.addRow();
                case '删除':
                    return this.deleteRow();
                case '重加载':
                    return this.reload();
            }
        };

        this.history.push('/'); /*初始化时指向根目录*/
    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar options={this.toolBarOptions}/>
                <JqgridWrapper options={this.gridOptions} ref="grid"/>
                <Router history= {this.history}>
                    <Switch>
                        <Route path="/edit"     component= {DictEdit}/>
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

export default connect(mapStateToProps, mapActionToProps)(SyseDict);

