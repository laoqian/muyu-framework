import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {Router, Route,IndexRoute,Switch} from 'react-router-dom'
import DictEdit from './edit'
import DictDelete from './delete'
import createHistory from 'history/createBrowserHistory'
import {notification } from 'antd';
import {findDOMNode} from 'react-dom';

class SyseDict extends Component{

    constructor(props) {
        super(props);

        let $t = this;

        $t.gridOptions = {
            url:'api/dict/findPage',
            gridName:this.moduleName,
            colModel: [
                {label: '键值', name: 'value', width: 200},
                {label: '标签', name: 'label', width: 150},
                {label: '类型', name: 'type', width: 150},
                {label: '描述', name: 'description', width: 150},
                {label: '排序', name: 'sort', width: 150}
            ],
            setQueryParam:()=>$t.setQueryParam(),
            ondblClickRow:()=>{
                $t.editRow();
                $t.isGridDbClick = true;
            },
            beforeSelectRow:(id)=>{
                let selectd = $t.getSelectedId() !== id;
                if(!selectd){
                    setTimeout(()=>{
                        $t.isGridDbClick?$t.isGridDbClick = false:$t.getGrid().resetSelection();
                    },200)
                }

                return selectd;
            }
        };

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
                    {name: '删除',path:'/delete',icon: 'delete',  },
                    {name: '修改',path:'/edit',  icon: 'edit',    },
                ]
            }
        };


        $t.moduleName = 'sysDict';
        $t.history = createHistory({basename:'#user'});
        $t.isGridDbClick =false; /*解决jqGrid双击事件触发单击事件*/

        $t.getGrid = (()=>{
            let grid;
            return ()=>{
                if(!grid || grid.length===0){
                    grid = $('.ui-jqgrid-btable',findDOMNode(this.refs.grid));
                }
                return grid;
            }
        })();


        $t.getSelectedId =()=>$t.getGrid().getGridParam('selrow');
        $t.getSelRowData = ()=>{
            let id =   $t.getSelectedId();
            return id?Object.assign($t.getGrid().getRowData(id),{id}):null ;
        };

        $t.eventFunc =  {};

        $t.eventFunc['修改'] = $t.editRow = ()=>{
            let row= $t.getSelRowData();
            if(!row){
                return notification.error({message:'未选择,要修改的标签'});
            }else {
                notification.success({message:'编辑标签：'+row.id});
            }

            this.history.push({pathname:'/edit',type:'modify',row,grid:$t.getGrid()});
        };

        $t.eventFunc['添加']    = $t.addRow     = ()=>$t.history.push({pathname:'/edit',type:'add',row:$t.getSelRowData(),grid:$t.getGrid()});
        $t.eventFunc['删除']    = $t.deleteRow  = ()=>$t.history.push({pathname:'/delete',row:$t.getSelRowData(),grid:$t.getGrid()});
        $t.eventFunc['重加载']  = $t.reload     = ()=>{
            $t.setQueryParam();
            $t.getGrid().trigger('reloadGrid')
        };

        $t.setQueryParam = ()=>{
            if($t.serachForm){
                let {validateFields} = $t.serachForm;
                validateFields((err,values)=>{
                    if(!err){
                        $t.getGrid().setGridParam({postData:values})
                    }
                })
            }
        }

        $t.click = item =>$t.eventFunc[item.name]?$t.eventFunc[item.name]():console.error('Warning:未定义的事件：'+item.name);

        $t.register=form=>$t.serachForm=form;

        $t.history.push('/'); /*初始化时指向根目录*/
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

