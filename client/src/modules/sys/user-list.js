import React ,{Component} from  'react'
import {connect} from 'react-redux'
import ToolBar from '../../components/tool-bar'
import {Router, Route, Link} from 'react-router-dom'
import JqgridWrapper from '../../containers/jqgrid-wrapper'
import Modal from '../../containers/modal'


let toolBarConfig = {
    sync:false,
    leftTools:{
        items:[
            {name:'username',type:'input' ,text:'登录名:',palaceHolder:'登录名',
                rules: [{
                required: true, message: '登录名不能为空!',
            }],
            },
            {name:'type',type:'select',options:{11:111,22:333},default:'',text:'类型:'}
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
        {name:'修改',icon:'edit'},
        {name:'保存',icon:'save'}
    ]}
};

let options= {
    // url:'/api/menu/findList'
};

class SysUser extends Component {

    constructor(props){
        super(props);
    }

    toolClick(tool){
    }

    render() {

        return (
            <div className="my-col-full">
                <ToolBar config={toolBarConfig} toolClick={this.toolClick}/>
                <JqgridWrapper options={options}/>
                <Modal/>
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

