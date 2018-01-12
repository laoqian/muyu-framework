import React from 'react'
import BaseComponent from "../../base/BaseComponent"
import colModel from './colModel'
import {Form,Tree} from 'antd';

const TreeNode = Tree.TreeNode;

class AuthForm extends BaseComponent {
    constructor(props) {
        super(props);

        let $t  = this,u=this.u;


        $t.state.checkedKeys =[];
        $t.state.selectedKeys =[];

        $t.baseUrl      = '/api/notify/';
        $t.moduleName   = "用户角色";
        $t.colModel     = colModel;
        $t.style ={width:'400px',height:'600px'};

        $t.regEvent("didMount",()=>{
            $t.u.get($t.getBaseUrl("browseVolumeIncrease?id="+$t.props.data.id));
        })
    }

    render(){
        let notify = this.props.data;
        let {createBy} = notify;
        return  (
            <div className="my-col-full my-notify-read-wrapper" >
                <div className="topic_full_title">
                    <span className="put-top">{this.u.getDict("sys_notify_type",notify.type)}</span>{notify.title}
                </div>
                <div className="change">
                    <span><label>发布时间：</label>{notify.createDate}</span>
                    <span><label>作者：</label>{createBy.name}</span>
                    <span><label>浏览次数：</label>{notify.browseVolume}</span>
                    <span><label>最后一次修改：</label>{notify.updateDate}</span>
                </div>
                <hr/>
                <div dangerouslySetInnerHTML={{__html:notify.content}} className="content"/>
            </div>
        )
    }
}


export default Form.create()(AuthForm);

