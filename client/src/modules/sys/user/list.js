import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../components/tool-bar'
import JqgridWrapper from '../../../containers/jqgrid-wrapper'
import {Modal} from 'antd'
import {Router, Match, Link, Route} from 'react-router-dom'
import UserEdit from './edit'
import UserDelete from './delete'
import { browserHistory } from 'react-router'
import createHistory from 'history/createBrowserHistory'

class SysUser extends Component{
    options = {};

    toolBarOptions = {
        sync: false,
        leftTools: {
            items: [
                {
                    name: 'username', type: 'input', text: '登录名:', palaceHolder: '登录名',
                    rules: [{
                        required: true, message: '登录名不能为空!',
                    }],
                },
                {name: 'type', type: 'select', options: {11: 111, 22: 333}, default: '', text: '类型:'}
            ],
            searchBtn: {
                text: '查询',
                icon: 'search'
            }
        },
        rightTools: {
            isReload: true,
            items: []
        }
    };

    state = {
        modal:{
            visible:false,
            loading:false,
            okType:'primary',
            title :'系统提示',
        }

    };

    constructor(props) {
        super(props);
        this.history = createHistory({basename:'#user'});
        this.toolBarOptions.rightTools.items = [
            {name: '添加',path:'/add',   icon: 'plus',     click: this.toolClick.bind(this)},
            {name: '删除',path:'/delete',icon: 'delete', click: this.toolClick.bind(this)},
            {name: '修改',path:'/edit',  icon: 'edit',    click: this.toolClick.bind(this)},
            {name: '保存',path:'/save',  icon: 'save',    click: this.toolClick.bind(this)}];
    }

    toolClick(item){
        let modal = this.state.modal;
        let path  = '';
        switch (item.name){
            case '添加':
                modal.okType='primary';
                modal.title='用户添加';
                path = '/add';
                break;
            case '删除':
                modal.okType='danger';
                modal.title='用户删除';
                path = '/delete';
                break;
            case '修改':
                modal.okType='primary';
                modal.title='用户修改';
                path = '/edit';
                break;
            case '保存':
                modal.okType= 'primary';
                modal.title = '用户保存';
                path = '/save';
                break;
        }

        modal.visible = true;

        this.LinkTo(modal,path);
    }

    LinkTo(modal,path){
        this.setState({modal});
        if(path instanceof String && path.length !==0){
            this.history.push(path);
        }


    }

    modalClick(type){
        let modal = this.state.modal;
        modal.visible = false;
        this.setState({modal});
    }


    render() {
        return (
            <Router history={this.history}>
                <div className="my-col-full">
                    <ToolBar options={this.toolBarOptions}/>
                    <JqgridWrapper options={this.options}/>
                    <Modal
                        title={this.state.modal.title}
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal.visible}
                        okType = {this.state.modal.okType}
                        onOk ={() => this.modalClick('ok')}
                        onCancel={() => this.modalClick('cancel')}
                        confirmLoading ={this.state.modal.loading}
                    >
                        <Route path="/add" component={UserEdit}/>
                        <Route path="/edit" render={() => (
                            <div>2222</div>
                        )}/>
                        <Route path="/delete" render={() => (
                            <div>确定要删除吗？</div>
                        )}/>
                    </Modal>
                </div>
            </Router>
        )
    }
}

SysUser.propTypes = {};

function mapStateToProps(state) {
    return {
        sys_user: state.sys_user
    }
}

function mapActionToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapActionToProps)(SysUser);

