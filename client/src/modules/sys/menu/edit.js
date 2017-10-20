import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Input, Modal} from 'antd';
import {userGet} from '../../../redux/actions/user'
import Loading from '../../../layouts/loading'
import {notification} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class DictEditForm extends Component {
    constructor(props) {
        super(props);

        this.state ={
            editData :null,
            loaded   :false,
            submiting:false
        };

        this.modalClick = (type) =>{
            if (type === 'ok') {
                this.setState({submiting: true});
                this.saveData();
            } else {
                this.props.history.push('/');
            }
        }

        this.saveData = () => {
            let data;
            let {validateFields} = this.props.form;

            validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    data = values;
                }
            });

            let self = this;
            if (data) {
                data = self.state.editData!==null?Object.assign(self.state.editData,data):data;
                $.get('/api/menu/save?'+$.param(data), function (data) {
                    let tip;

                    self.setState({submiting:false});
                    if (data.code === 0) {
                        let {grid} = self.props.location;

                        tip = notification.success;
                        self.props.history.push('/');
                        grid.trigger('reloadGrid');
                    } else {
                        tip = notification.error;
                    }

                    tip({message: data.msg});
                })
            }
        }

        this.loadData = ()=>{
            let self  = this;
            let {row,type} = self.props.location;

            if (!self.state.loaded && row) {
                $.get('/api/menu/get?id=' + row.id, function (bean) {
                    if (bean.code === 0 && bean.data) {
                        const {setFieldsValue} = self.props.form;

                        if(type==='modify'){
                            self.setState({editData:bean.data,loaded:true});
                        }else{
                            self.setState({loaded:true});
                        }

                        setFieldsValue(bean.data);
                    } else {
                        notification.error({message:bean.msg});
                    }
                });
            }
        }

    }


    componentWillMount(){
    }

    componentDidMount(){
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        this.state.submiting = false;
    }


    componentWillUpdate(nextProps,nextState){
    }

    componentDidUpdate(prevProps, prevState){
        this.loadData();
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
                title={this.state.editData?`字典修改-${this.state.editData.id}`:'字典添加'}
                wrapClassName="vertical-center-modal"
                visible={true}
                onOk={() => this.modalClick('ok')}
                onCancel={() => this.modalClick('cancel')}
                confirmLoading={this.state.submiting}
            >
                <Form ref="userForm" className="my-form-square" style={{width:'400px',height:'460px'}}>
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
                {this.loadingData ? <Loading isLayerHide={true} text={this.state.loadingText}/> : ''}
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

