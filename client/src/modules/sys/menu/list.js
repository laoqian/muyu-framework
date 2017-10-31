import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {Router, Route, IndexRoute, Switch} from 'react-router-dom'
import DictEdit from './edit'
import DictDelete from './delete'
import {findDOMNode} from 'react-dom';
import ListComponent from "../../base/ListComponent";
import {notification} from 'antd';

class SyseDict extends ListComponent{

    constructor(props) {
        super(props);

        let $t = this;
        $t.baseUrl      = '/api/menu/'   ;
        $t.moduleName   = 'sysMenu'     ;
        $t.history.push('/'); /*初始化时指向根目录*/

        $t.setGridInitParam({
            url             : 'api/menu/findTree',
            baseUrl         : $t.baseUrl,
            gridName        : this.moduleName,
            treeGrid        : true,
            inlineEdit      : true,
            ExpandColumn    : 'name',
            ExpNum          : 8,
            rownumbers      : false,
            colModel        : [
                                {label: '名称', name: 'name', width: 200,editable:true,editrules:{required:true}},
                                {label: '链接', name: 'href', width: 150,editable:true},
                                {label: '排序', name: 'sort', width: 100,align:'center',editable:true},
                                {label: '显示', name: 'isShow', width: 100,align:'center',editable:true}
                            ],
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
           let list =  $t.getEditList();

           if(list){
               $.ajax({
                   url :$t.encodeUrl('saveBatch'),
                   type : 'post',
                   data : JSON.stringify({
                       list : list
                   }),
                   timeout : 10000,
                   contentType : "application/json;charset=utf-8",
                   dataType : "json",
                   success : function(data) {
                       if(data.code===0){
                           $t.reload();
                           notification.success({message:data.msg});
                       }else{
                           notification.error({message:data.msg});
                       }
                   },
                   error : function(error) {
                       console.log(error);
                       notification.error({message:'连接服务器超时'});
                   }
               });
           }
        });

        $t.regEvent("插入",'insertRow',()=>{
            $t.history.push({
                pathname: '/edit',
                type    : 'insert',
                row     : $t.getSelRowData(),
                grid    : $t.getGrid()
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
                        <Route path="/edit" component={DictEdit}/>
                        <Route path="/delete" component={DictDelete}/>
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

function mapStateToProps(state) {
    return {}
}

function mapActionToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapActionToProps)(SyseDict);

