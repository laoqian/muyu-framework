import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
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
        $t.baseUrl     = '/api/model/';
        $t.titlePrefix = "模型";
        $t.moduleName  = 'sysModel';
        $t.editForm = ModelForm;

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
                    {name: '添加', icon: 'plus',    },
                    {name: '修改', icon: 'edit',    },
                    {name: '编辑', icon: 'edit',    },
                    {name: '发布', icon: 'edit',    },
                    {name: '删除', icon: 'delete',  },
                ]
            }
        };

        $t.regEvent("didMount",()=>{
            $t.dialog('测试',row=>Modal.confirm(<ModelForm row={row}/>));
            $t.dialog('发布',row=>$t.u.get($t.encodeUrl('deploy?id='+row.id),bean=>console.log(bean)));
            $t.dialog('编辑',row=>window.open('./modeler.html?modelId='+row.id,row.name).focus());
        });


    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register} />
                <JqgridWrapper options={this.gridOptions} regGrid= {this.regGrid}/>
            </div>
        )
    }
}

