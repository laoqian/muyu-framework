import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Icon, Input, Button, Checkbox,Modal} from 'antd';
import {userGet} from '../../../actions/user'
import Loading from '../../../components/loading'

const FormItem = Form.Item;

class UserEditForm extends Component {
    constructor() {
        super();
        this.state ={visible:true,loading:false}

        this.editUser =  e=>{
            let form;
            e.preventDefault();
            this.props.form.validateFields((err, values)=>{
                if (!err) {
                    console.log('Received values of form: ', values);
                    form = values;
                }
            });

            if (form !== undefined) {
                this.props.auth(form.username, form.password);
            }
        }

        this.modalClosed =()=>{
        }
    }

    componentWillMount(){
        let id = this.props.match.params.id;
        if(id){
            this.props.userGet(id);
            this.loadingUser = true;
        }else{
            this.loadingUser = false;
        }
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
                confirmLoading={this.state.loading}
            >
                <Form onSubmit = {this.editUser} className="login-form">
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入有效的用户名!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入有效的密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                </Form>
                {this.loadingUser? <Loading text={'正在加载用户数据...'}/>:''}
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

