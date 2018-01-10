import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";

export default class IndexContainer extends BaseComponent{

    constructor(props){
        super(props);
        let $t = this;

        $t.moduleName  = 'sysIndex';
        $t.titlePrefix = "主页";

        $t.regDialog('/auth',"授权",row=>{
            return new Promise((res,rej)=>{
                let u = this.u;
                u.get($t.getBaseUrl('findUserRoleList?userId='+row.id),(bean)=>{
                    let selectedKeys =[];
                    bean.data.forEach(item=>selectedKeys.push(item.roleId));
                    bean.success()?res({selectedKeys}):rej(bean);
                })
            })
        });
    }

    render() {
        return (
            <div className="my-col-full" >
                主页....
            </div>
        )
    }
}
