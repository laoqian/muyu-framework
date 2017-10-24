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
            url: 'api/menu/findTree',
            gridName: this.moduleName,
            treeGrid: true,
            ExpandColumn : 'name',
            rownumbers:false,
            colModel: [
                {label: '名称', name: 'name', width: 200},
                {label: '链接', name: 'href', width: 150},
                {label: '排序', name: 'sort', width: 100,align:'center'}
            ]
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
                    {name: '添加', path: '/add', icon: 'plus',},
                    {name: '插入', path: '/add', icon: 'plus-square-o',},
                    {name: '升级', path: '/add', icon: 'swap-left',},
                    {name: '降级', path: '/add', icon: 'swap-right',},
                    {name: '上移', path: '/add', icon: 'arrow-up',},
                    {name: '下移', path: '/add', icon: 'arrow-down',},
                    {name: '修改', path: '/edit', icon: 'edit',},
                    {name: '删除', path: '/delete', icon: 'delete',}
                ]
            }
        };


        $t.regEvent("插入",'insertRow',()=>{
            $t.history.push({
                pathname: '/edit',
                type    : 'insert',
                row     : $t.getSelRowData(),
                grid    : $t.getGrid()
            })
        });

        $t.chgLevel = (id,type)=>{
            let data;
            if(arguments.length===2){
                data ={id,type};
            }else{
                let row = $t.getSelRowData();
                if(row){
                    data={id:row.id,type:id};
                }else{
                   return notification.error({message:'未选择行'});
                }
            }

            $.get($t.encodeUrl('chgLevel?'+$.param(data)),function(bean){

            })
        }

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

