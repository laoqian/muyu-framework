import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel from './colModel'


 class ActProcess extends BaseComponent{

    constructor(props){
        super(props);

        let $t = this;

        $t.extend("List");
        $t.baseUrl     = '/api/process/';
        $t.titlePrefix = "流程";
        $t.moduleName  = 'actProcess';
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
            right :{
                items :[
                    {name: '启动'      ,  icon: 'plus',       },
                    {name: '删除'      ,  icon: 'delete',     },
                ]
            }
        };

        $t.regEvent("willMount",()=>{
            let {user} = this.props;
            if(user && user.enabled){
                let role = _.find(user.roleList,role=>role.ename==="SUPER_ADMIN");
                if(role){
                    $t.toolBarOptions.right.items.push({name: '转为模型'  ,   icon: 'rollback',   });
                }
            }
        });

        $t.confirm('转为模型',row=>`确定将流程-${row.name}转为模型吗？`,row=>$t.getWithTip("/toModel?id="+row.id));
    }

    render() {
        return (
            <div className="my-col-full" >
                <ToolBar {...this.toolBarOptions} click={this.click} register={this.register} />
                <JqgridWrapper options={this.gridOptions}/>
            </div>
        )
    }
}

export default connect(state=>({
    user        :   state.user,
}),dispatch=>({}))(ActProcess);