import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class UserEdit extends Component {
    constructor() {
        super();
        this.auth = this.auth.bind(this);
    }

    auth(e){
        let form;

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                form = values;
            }
        });

        if(form!==undefined){
            this.props.auth(form.username,form.password);
        }
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div  className="full-screen flex-hvm login-bg">
                <Form onSubmit={this.auth} className="login-form">
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入有效的用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入有效的密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button" >
                            登  陆
                        </Button>
                        <a href="">注册!</a>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        time: state.time
    }
}

function mapActionToProps(dispatch) {
    return {
    }
}

const WrappedNormalLoginForm = Form.create()(UserEdit);

export default connect(
    mapStateToProps,
    mapActionToProps
)(WrappedNormalLoginForm);

