import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel from './colModel'
import Modal from "../../base/Modal"
import GenEditForm from './edit'

class GenTable extends BaseComponent{

    constructor(props){
        super(props);
        let $t = this,u= $t.u;

        $t.extend("List");
        $t.baseUrl    = '/api/gen/'  ;
        $t.titlePrefix = "代码生成";
        $t.moduleName = 'sysGen';
        $t.setGridInitParam({
            url:$t.getBaseUrl('findPage'),
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
                    {name: '新建',icon: 'plus',   },
                    {name: '删除',con:  'delete', },
                    {name: '修改',icon: 'edit',   },
                ]
            }
        };

        $t.regEvent("didMount",()=>{
            $t.dialog("新建",()=>{
                u.get($t.getBaseUrl('getTableList'),(bean)=>{
                    Modal.open(<GenEditForm tableList={bean.data} parentGrid={this.grid}/>)
                })
            });
        });
    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register} />
                <JqgridWrapper options={this.gridOptions} />
            </div>
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

export default connect(mapStateToProps, mapActionToProps)(GenTable);

