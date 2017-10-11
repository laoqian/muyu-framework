import React ,{Component} from  'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import ToolBar from '../../components/tool-bar'
import {Router, Route, Link} from 'react-router-dom'
import { Row, Col } from 'antd';

let toolBarConfig = {
    sync:false,
    leftTools:{
        items:[
            {   name:'username',type:'input' ,text:'登录名:',palaceHolder:'登录名',
                rules: [{
                required: true, message: '登录名不能为空!',
            }],
            },
            {type:'select',options:{11:111,22:333},default:'',text:'类型:'}
        ],
        searchBtn:{
            text:'查询',
            icon:'search'
        }
    },
    rightTools:{
        isReload:true,
        items:[
        {name:'添加',icon:'plus'},
        {name:'删除',icon:'delete'},
        {name:'修改',icon:'edit'}
    ]}
};


class SysUser extends Component {

    constructor(props){
        super(props);
    }

    toolClick(tool){
        console.log(tool)
    }

    render() {

        return (
            <div className="my-col-full">
                <ToolBar config={toolBarConfig} toolClick={this.toolClick}/>
            </div>
        )
    }
}


SysUser.propTypes = {

};


function mapStateToProps(state) {
    return {
        sys_user:state.sys_user
    }
}

function mapActionToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapActionToProps)(SysUser);

