import React ,{Component} from  'react'
import {connect} from 'react-redux'
import ToolBar from '../../../components/tool-bar'
import {Router, Route, Link} from 'react-router-dom'
import JqgridWrapper from '../../../containers/jqgrid-wrapper'
import {Modal} from 'antd'
import UserEdit from './edit'


class SysUser extends Component {
    options= {

    }

    toolBarOptions = {
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
            items:[]}
    };

    state ={
        modalVisible:false
    }

    constructor(props){
        super(props);

        this.toolBarOptions.rightTools.items =[
            {name:'添加',icon:'plus',click:this.toolClick.bind(this)},
            {name:'删除',icon:'delete'},
            {name:'修改',icon:'edit'},
            {name:'保存',icon:'save'}];
    }

    toolClick(visible) {
        this.setState({modalVisible:visible});
    }

    render() {
        return (
            <div className="my-col-full">
                <ToolBar options={this.toolBarOptions} />
                <JqgridWrapper options={this.options}/>
                <Modal
                    title="用户编辑"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalVisible}
                    onOk={() => this.toolClick(false)}
                    onCancel={() => this.toolClick(false)}
                >
                </Modal>
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

