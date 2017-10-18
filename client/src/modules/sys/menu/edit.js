import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Icon, Input, Button, Checkbox,Modal,Row,TreeSelect,Col,TreeNode} from 'antd';
import {userGet} from '../../../redux/actions/user'
import Loading from '../../../components/loading'
import {notification } from 'antd';

const FormItem = Form.Item;

const treeData = [{
    label: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{
        label: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
    }, {
        label: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
    }],
}, {
    label: 'Node2',
    value: '0-1',
    key: '0-1',
}];

class MenuEditForm extends Component {
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
        console.log(11111111);
        if(!this.state.visible && this.props.match.params.id){
            this.loadUser();
        }

        this.state.visible = true;
        this.state.submiting = false;
        return true;
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol  : {span:6  },
            wrapperCol: {span:18 },
        };
        let style={width:'100%'}

        console.log("menu edit");
        return (

            <Modal
                title= '用户编辑'
                wrapClassName="vertical-center-modal"
                visible= {this.state.visible}
                onOk={() => this.modalClosed('ok')}
                onCancel={() => this.modalClosed('cancel')}
                confirmLoading={this.state.submiting}
            >
                <Form ref="userForm" className="my-user-form" >
                    <Row>
                        <Col span={12}>
                            <FormItem label="归属公司" {...formItemLayout}>
                                {getFieldDecorator('office.id', {
                                    rules: [{required: true, message: '请输入有效的用户名!'}],
                                })(
                                    <TreeSelect
                                        style={style}
                                        showSearch
                                        placeholder= "Please select"
                                        allowClear
                                        treeDefaultExpandAll
                                        treeData={treeData}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="归属部门" {...formItemLayout}>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入有效的密码!'}],
                                })(
                                    <TreeSelect
                                        style={style}
                                        showSearch
                                        placeholder= "Please select"
                                        allowClear
                                        treeDefaultExpandAll
                                        treeData={treeData}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="登录名" {...formItemLayout}>
                                {getFieldDecorator('loginname', {
                                    rules: [{required: true, message: '请输入有效的用户名!'}],
                                })(
                                    <Input placeholder="用户名"   style={style}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="姓名" {...formItemLayout}>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请输入有效的姓名!'}],
                                })(
                                    <Input placeholder="姓名"  style={style}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="密码" {...formItemLayout}>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入有效的密码!'}],
                                })(
                                    <Input type="password"
                                           placeholder="密码"  style={style}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="确认密码" {...formItemLayout}>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入有效的密码!'}],
                                })(
                                    <Input type="password"
                                           placeholder="密码"  style={style}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}/>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="邮箱" {...formItemLayout}>
                                {getFieldDecorator('email', {
                                    rules: [{required: true, message: '请输入有效的密码!'}],
                                })(
                                    <Input type="email"
                                           placeholder="邮箱"  style={style}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="电话" {...formItemLayout}>
                                {getFieldDecorator('phone', {
                                    rules: [{required: true, message: '请输入有效的密码!'}],
                                })(
                                    <Input type="phone"
                                           placeholder="电话"  style={style}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}/>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="用户类型" {...formItemLayout}>
                                {getFieldDecorator('userType', {
                                    rules: [{required: true, message: '请输入有效的密码!'}],
                                })(
                                    <Input type="text"
                                           placeholder="邮箱"  style={style}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
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

const MenuEdit = Form.create()(MenuEditForm);

export default connect(
    mapStateToProps,
    mapActionToProps
)(MenuEdit);

