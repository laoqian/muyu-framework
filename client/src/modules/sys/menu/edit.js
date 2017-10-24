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

        this.bindDataOnce = ()=>{
            let {row,type} = this.props.location;
            const {setFieldsValue} = this.props.form;

            if(!this.props.location.binded){
                this.props.location.binded = true;

                switch (type){
                    case 'add':
                        if(row){
                            this.state.editData = {parentId:row.parentId};
                            setFieldsValue(row);
                        }
                        break;
                    case 'modify':
                        this.state.editData = row;
                        setFieldsValue(row);
                        break;
                    case 'insert':
                        this.state.editData = {
                            parentId  : row.id,
                            parentName: row.name
                        };
                }
            }
        }

    }

    componentWillMount(){

    }

    componentDidMount(){
        this.bindDataOnce();
    }

    componentWillReceiveProps(nextProps) {
        this.state.submiting = false;
    }

    componentWillUpdate(nextProps,nextState){

    }

    componentDidUpdate(prevProps, prevState){
        this.bindDataOnce();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span:16},
        };
        let title= '菜单添加';
        let {type,binded} = this.props.location;

        if(binded){
            switch (type){
                case 'modify':
                    title=`菜单修改-${this.state.editData.id}`;
                    break;
                case 'add':
                    title='菜单添加';
                    break;
                case 'insert':
                    title=`${this.state.editData.parentName}-添加子菜单`;
                    break;
            }
        }

        return (
            <Modal
                title={title}
                wrapClassName="vertical-center-modal"
                visible={true}
                onOk={() => this.modalClick('ok')}
                onCancel={() => this.modalClick('cancel')}
                confirmLoading={this.state.submiting}
            >
                <Form ref="userForm" className="my-form-square" style={{width:'400px',height:'460px'}}>
                    <FormItem label="名称" {...formItemLayout}>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入有效的用户名!'}],
                        })(
                            <Input placeholder="名称" />
                        )}
                    </FormItem>

                    <FormItem label="链接" {...formItemLayout}>
                        {getFieldDecorator('href')(
                            <Input placeholder="链接" />
                        )}
                    </FormItem>

                    <FormItem label="排序" {...formItemLayout}>
                        {getFieldDecorator('sort', {
                            rules: [{required: true, message: '请输入有效的排序号!'}],
                        })(
                            <Input placeholder="排序" />
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

