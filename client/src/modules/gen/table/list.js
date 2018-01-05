import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import GenTableEdit from './edit'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel from './colModel'

class GenTable extends BaseComponent{

    constructor(props){
        super(props);
        let $t = this;

        $t.extend("List");
        $t.baseUrl    = '/api/gen/'  ;
        $t.titlePrefix = "代码生成";
        $t.moduleName = 'sysGen';
        $t.editForm = GenTableEdit;
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
                    {name: '添加',icon: 'plus',   },
                    {name: '删除',con:  'delete', },
                    {name: '修改',icon: 'edit',   },
                ]
            }
        };
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

