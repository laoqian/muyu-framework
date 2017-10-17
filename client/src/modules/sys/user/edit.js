import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Icon, Input, Button, Checkbox,Modal} from 'antd';
import {userGet} from '../../../actions/user'
import Loading from '../../../components/loading'
import {notification } from 'antd';

const FormItem = Form.Item;

class UserEditForm extends Component {
    constructor() {
        super();

        this.saveUser =()=>{
            let user;
            this.props.form.validateFields((err, values)=>{
                if (!err) {
                    console.log('Received values of form: ', values);
                    user = values;
                }
            });

            let self  = this;
            if(user){
                $.post('/api/user/save',user,function (data) {
                    let tip;

                    if(data.code ===0 ){
                        tip = notification.success;
                    }else{
                        tip = notification.error;
                    }

                    tip({message:data.msg});
                    self.setState({submiting:false});
                })
            }
        }

        this.modalClosed =(type)=>{
            if(type==='ok'){
                this.setState({submiting:true});
                this.saveUser();
            }else{
                this.setState({visible:false});
            }
        }

        this.loadUser = ()=>{
            let id = this.props.match.params.id;

            if(id){
                this.state.loadingUser = true ;
                let self = this;
                $.get('/api/user/get?id='+id,function (data) {

                    if(data.code === 0 && data.data){
                        self.props.form.setFieldsValue(user);
                    }else{
                        notification.error({message:data.msg});
                    }

                    self.state.loadingUser = false;
                });
            }
        };

        this.state = {
            loadingUser:false,
            loadingText:'加载中',
            user:{}
        }

    }

    shouldComponentUpdate(nextProps,nextState){
        if(!this.state.visible && this.props.match.params.id){
            this.loadUser();
        }

        this.state.visible = true;
        this.state.submiting = false;
        return true;
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        return (

            <Modal
                title= '用户编辑'
                wrapClassName="vertical-center-modal"
                visible= {this.state.visible}
                onOk={() => this.modalClosed('ok')}
                onCancel={() => this.modalClosed('cancel')}
                confirmLoading={this.state.submiting}
            >
                <Form ref="userForm" className="my-user-form" layout="horizontal">
                    <FormItem label="登录名">
                        {getFieldDecorator('loginname', {
                            rules: [{required: true, message: '请输入有效的用户名!'}],
                        })(
                            <Input placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem label="密码">
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入有效的密码!'}],
                        })(
                            <Input type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem label="再次输入密码">
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入有效的密码!'}],
                        })(
                            <Input type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                </Form>
                {this.loadingUser? <Loading isLayerHide={true} text={this.state.loadingText}/>:''}
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapActionToProps(dispatch) {
    return {
        userGet:bindActionCreators(userGet,dispatch)
    }
}

const UserEdit = Form.create()(UserEditForm);

export default connect(
    mapStateToProps,
    mapActionToProps
)(UserEdit);

