import React from 'react'
import {connect} from 'react-redux'
import {userAuth} from '../redux/actions/user'
import {bindActionCreators} from 'redux'
import { Form, Icon, Input, Button, Checkbox,Col,Row } from 'antd';
import BaseComponent from '../modules/base/BaseComponent'
const FormItem = Form.Item;

class Login extends BaseComponent {
    constructor() {
        super();

        let $t = this;
        $t.state ={
            varify :null
        };

        $t.getVarifyImage = ()=>{
            $t.u.get($t.encodeUrl('getCachedCode'),function (bean) {
                if(bean.success()){
                    $t.setState({varify:bean.data});
                }
            })
        };

        $t.getVarifyHtml= (src)=>{
            const { getFieldDecorator } = $t.props.form;
            return (
                <FormItem>
                    <Row justify="space-between" type="flex" align="top">
                        <Col span="14" >
                            {getFieldDecorator('code',{
                                required:true
                            })(
                                <Input prefix={<Icon type="book" style={{fontSize:13}} />}  placeholder="验证码"/>
                            )}
                        </Col>
                        <Col span="10">
                            <img src={src}  className="login-varify" onClick={this.getVarifyImage} style={{width:'100%'}}/>
                        </Col>
                    </Row>
                </FormItem>
            )
        };

        $t.auth=(e)=>{
            let data;
            let {validateFields} =this.props.form;

            e.preventDefault();
            validateFields((err,values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    data = values;
                }
            });

            if(data){
                $t.props.auth(data);
            }
        }
    }

    componentDidUpdate(prevProps, prevState){
        let {user} = this.props;
        let preUser  = prevProps.user;
        if(user && user.authErrorNum>3 && ( !this.state.varify ||preUser.authErrorNum!==user.authErrorNum) ){
            this.getVarifyImage();
        }
    }
    render() {
        let varifyHtml = null;
        if(this.state.varify){
            varifyHtml = this.getVarifyHtml('data:image/jpeg;base64,'+this.state.varify);
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div  className="full-screen flex-hvm login-bg">
                <Form onSubmit={this.auth} className="login-form">
                    <FormItem>
                        <Row justify="center" type="flex">
                            <Col >
                                <h4 style={{color:'black'}}>木鱼快速开发框架</h4>
                            </Col>
                        </Row>
                    </FormItem>
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
                    {varifyHtml}
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <Button type="primary" htmlType="submit" className="login-form-button" >
                            登  陆
                        </Button>
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
        time: state.time,
        user: state.user
    }
}

function mapActionToProps(dispatch) {
    return {
        auth: bindActionCreators(userAuth, dispatch)
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default connect(
    mapStateToProps,
    mapActionToProps
)(WrappedNormalLoginForm);

