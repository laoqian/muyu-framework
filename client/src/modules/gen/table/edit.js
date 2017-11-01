import React                                    from 'react'
import {connect}                                from 'react-redux'
import {bindActionCreators}                     from 'redux'
import {Form, Input, Modal, Row, Col,Button}    from 'antd';
import {userGet}                                from '../../../redux/actions/user'
import {notification}                           from 'antd';
import JqgridWrapper                            from '../../grid/index'
import ListComponent                            from "../../base/ListComponent";
import u                                        from '../../../utils'

const FormItem = Form.Item;

class DictEditForm extends ListComponent {
    constructor(props) {
        super(props);

        this.state = {
            editData: null,
            submiting: false
        };

        this.modalClick = (type) => {
            if (type === 'ok') {
                this.saveData();
            } else {
                this.props.history.push('/');
            }
        };

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
                this.setState({submiting: true});
                data = self.state.editData !== null ? Object.assign(self.state.editData, data) : data;
                u.get('/api/dict/save?'+ $.param(data),function(data) {
                    let tip;
                    self.setState({submiting: false});
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
        };

        this.bindDataOnce = () => {
            let {row, type} = this.props.location;
            const {setFieldsValue} = this.props.form;

            if (!this.props.location.binded) {
                this.props.location.binded = true;

                switch (type) {
                    case 'add':
                        if (row) {
                            this.state.editData = {parentId: row.parentId};
                            setFieldsValue(row);
                        } else {
                            this.state.editData = {parentId: 1};
                        }

                        break;
                    case 'modify':
                        this.state.editData = row;
                        setFieldsValue(row);
                        break;
                }
            }
        }

        let $t = this;
        $t.baseUrl = '/api/gen/';
        $t.moduleName = 'sysGenEdit';

        $t.setGridInitParam({
            url: 'api/menu/findTree',
            baseUrl: $t.baseUrl,
            gridName: this.moduleName,
            inlineEdit: true,
            ExpandColumn: 'name',
            pagerAble:false,
            rownumbers: false,
            colModel: [
                {label: '列名', name: 'name', width: 100},
                {label: '说明', name: 'comments', width: 100, editable: true},
                {label: '物理类型', name: 'jdbcType', width: 100, editable: true, align: 'center'},
                {label: 'Java类型', name: 'javaType', width: 100, editable: true, align: 'center'},
                {label: 'Java属性名称', name: 'javaFiled', width: 100, editable: true, align: 'center'},
                {label: '可空', name: 'isNull', width: 60, editable: true, align: 'center'},
                {label: '查询', name: 'isQuery', width: 60, editable: true, align: 'center'},
                {label: '查询匹配方式', name: 'queryType', width: 100, editable: true, align: 'center'},
                {label: '显示表单类型', name: 'showType', width: 100, editable: true, align: 'center'},
                {label: '字典类型', name: 'dictType', width: 100, editable: true, align: 'center'},
                {label: '排序', name: 'sort', width: 100, editable: true, align: 'center'},
            ],
            ondblClickRow: null
        });

        $t.loadTableInfo = ()=>{
            let {validateFields} = this.props.form;
            let data;

            validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    data = values;
                }
            });

            if(data){
                $.get
            }
        }
    }


    componentWillMount() {
    }

    componentDidMount() {
        this.bindDataOnce();
    }

    componentWillReceiveProps(nextProps) {
        this.state.submiting = false;
    }


    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
        this.bindDataOnce();
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

        let title = '业务表添加';
        let {type, binded} = this.props.location;

        if (binded) {
            switch (type) {
                case 'modify':
                    title = `业务表修改-${this.state.editData.id}`;
                    break;
                case 'add':
                    title = '业务表添加';
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
                <div style={{width: '1200px', height: '600px'}} className="flex-vs">
                    <Form ref="form" className="my-form-square">
                        <Row>
                            <Col span={6}>
                                <FormItem label="表名" {...formItemLayout}>
                                    {getFieldDecorator('name', {
                                        rules: [{required: true, message: '请输入有效的表名!'}],
                                    })(
                                        <Input placeholder="表名"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="说明" {...formItemLayout}>
                                    {getFieldDecorator('comments', {
                                        rules: [{required: true, message: '请输入有效的说明!'}],
                                    })(
                                        <Input placeholder="说明"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="类名" {...formItemLayout}>
                                    {getFieldDecorator('className', {
                                        rules: [{required: true, message: '请输入有效的类名!'}],
                                    })(
                                        <Input placeholder="类名"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem {...formItemLayout}>
                                    <Button icon="reload" onChange={this.loadTableInfo}>加载</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <JqgridWrapper options={this.gridOptions} ref="grid"/>
                </div>
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

