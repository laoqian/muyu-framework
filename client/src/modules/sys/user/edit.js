import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class UserEditForm extends Component {
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
            <div  className="my-modal-wrapper">
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

const UserEdit = Form.create()(UserEditForm);

export default connect(
    mapStateToProps,
    mapActionToProps
)(UserEdit);

