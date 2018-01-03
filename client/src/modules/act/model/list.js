import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {Router, Route,IndexRoute,Switch} from 'react-router-dom'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import ModelForm from './edit'
import colModel from './colModel'
import Modal from "../../base/Modal"

export default class SysModel extends BaseComponent{

    constructor(props){
        super(props);

        let $t = this;

        $t.extend("List");
        $t.baseUrl    = '/api/model/';
        $t.moduleName = 'sysModel';

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
                    {name: '测试',path:'/test',       icon: 'edit',       },
                    {name: '删除',path:'/delete',     icon: 'delete',     },
                ]
            }
        };

        $t.regEvent("didMount",()=>{

            $t.regDialog('/test',"测试",data=>{
                Modal.open(<ModelForm/>,{childProps:{data,grid:$t.getGrid()}});
            });

            $t.regDialog('/deploy',"发布",row=>{
                $t.u.get($t.encodeUrl('deploy?id='+row.id),bean=>console.log(bean));
            });

            $t.regDialog('/modeler',"编辑",row=>{
                window.open('./modeler.html?modelId='+row.id,row.name).focus();
            });
        });
    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register} />
                <JqgridWrapper options={this.gridOptions} ref="grid"/>
            </div>
        )
    }
}

class Test extends BaseComponent{
    constructor(){
        super();
        this.ok =()=>{
            return new Promise((res,rej)=>{
                res("success");
            })
        };

        this.regEvent("willMount",()=>{
            this.props.setOkHander(this.ok);
        })
    }

    render(){
        return <div>1222</div>
    }
}

