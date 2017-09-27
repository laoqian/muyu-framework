import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {user_auth_action} from '../actions/action'
import {bindActionCreators} from 'redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


class Login extends Component {
    constructor() {
        super();
        this.auth = this.auth.bind(this);
    }

    auth(){
       let refs = this.refs;
       this.props.auth(refs.username.value,refs.password.value);
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div  className="full-screen flex-hvm login-bg">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </FormItem>
                </Form>
            </div>
        )
    }
}


Login.propTypes = {
    //path: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
    return {
        time: state.time
    }
}

function mapActionToProps(dispatch) {
    return {
        auth: bindActionCreators(user_auth_action, dispatch)
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default connect(
    mapStateToProps,
    mapActionToProps
)(WrappedNormalLoginForm);

