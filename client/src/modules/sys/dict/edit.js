import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Input, Modal, Row, Col, TreeNode} from 'antd';
import {userGet} from '../../../redux/actions/user'
import Loading from '../../../components/loading'
import {notification} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class DictEditForm extends Component {
    constructor() {
        super();

        this.saveData = () => {
            let data;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    data = values;
                }
            });

            let self = this;
            if (data) {
                $.get('/api/dict/save?'+$.param(data), function (data) {
                    let tip;
                    if (data.code === 0) {
                        tip = notification.success;
                    } else {
                        tip = notification.error;
                    }

                    tip({message: data.msg});
                    self.setState({submiting: false});
                })
            }
        }

        this.modalClosed = (type) => {
            if (type === 'ok') {
                this.setState({submiting: true});
                this.saveData();
            } else {
                this.setState({visible: false});
            }
        }

        this.loadData = () => {
            let id = this.props.match.params.id;

            if (id) {
                this.state.loadingUser = true;
                let self = this;
                $.get('/api/dict/get?id=' + id, function (data){

                    if (data.code === 0 && data.data) {
                        self.props.form.setFieldsValue(user);
                    } else {
                        notification.error({message: data.msg});
                    }

                    self.state.loadingUser = false;
                });
            }
        };

        this.state = {
            loadingUser: false,
            loadingText: '加载中',
            user: {}
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.visible && this.props.match.params.id) {
            this.loadData();
        }

        this.state.visible = true;
        this.state.submiting = false;
        return true;
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16},
        };
        let textAreaStyle = {
            height: '100px',
            resize: 'none'
        };

        return (

            <Modal
                title='字典编辑'
                wrapClassName="vertical-center-modal"
                visible={this.state.visible}
                onOk={() => this.modalClosed('ok')}
                onCancel={() => this.modalClosed('cancel')}
                confirmLoading={this.state.submiting}
            >
                <Form ref="userForm" className="my-form-square" style={{width:'400px',height:'400px'}}>
                    <FormItem label="键值" {...formItemLayout}>
                        {getFieldDecorator('value', {
                            rules: [{required: true, message: '请输入有效的用户名!'}],
                        })(
                            <Input placeholder="键值" />
                        )}
                    </FormItem>

                    <FormItem label="标签" {...formItemLayout}>
                        {getFieldDecorator('label', {
                            rules: [{required: true, message: '请输入有效的密码!'}],
                        })(
                            <Input placeholder="标签" />
                        )}
                    </FormItem>

                    <FormItem label="类型" {...formItemLayout}>
                        {getFieldDecorator('type', {
                            rules: [{required: true, message: '请输入有效的用户名!'}],
                        })(
                            <Input placeholder="类型" />
                        )}
                    </FormItem>

                    <FormItem label="排序" {...formItemLayout}>
                        {getFieldDecorator('sort', {
                            rules: [{required: true, message: '请输入有效的姓名!'}],
                        })(
                            <Input placeholder="排序" />
                        )}
                    </FormItem>

                    <FormItem label="描述" {...formItemLayout}>
                        {getFieldDecorator('description', {
                            rules: [],
                        })(
                            <Input placeholder="描述" />
                        )}
                    </FormItem>

                    <FormItem label="备注" {...formItemLayout}>
                        {getFieldDecorator('remarks', {
                            rules: [],
                        })(
                            <TextArea placeholder="备注" style={textAreaStyle} />
                        )}
                    </FormItem>

                </Form>
                {this.loadingUser ? <Loading isLayerHide={true} text={this.state.loadingText}/> : ''}
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
        userGet: bindActionCreators(userGet, dispatch)
    }
}

const DictEdit = Form.create()(DictEditForm);

export default connect(
    mapStateToProps,
    mapActionToProps
)(DictEdit);

