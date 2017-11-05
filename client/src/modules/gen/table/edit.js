import React                                    from 'react'
import {connect}                                from 'react-redux'
import {bindActionCreators}                     from 'redux'
import {Form, Input, Modal, Row, Col,Select,Button}    from 'antd';
import {userGet}                                from '../../../redux/actions/user'
import {notification}                           from 'antd';
import JqgridWrapper                            from '../../grid/index'
import ListComponent                            from "../../base/ListComponent";
import u                                        from '../../../utils'

const FormItem  = Form.Item;
const Option    = Select.Option;

class GenEditForm extends ListComponent {
    constructor(props) {
        super(props);
        let $t = this;

        $t.baseUrl = '/api/gen/';
        $t.moduleName = 'sysGenEdit';

        $t.setGridInitParam({
            url       : $t.encodeUrl('findTableColumn'),
            baseUrl   : $t.baseUrl,
            gridName  : this.moduleName,
            inlineEdit: true,
            ExpandColumn: 'name',
            pagerAble   : false,
            rownumbers  : false,
            colModel    : [
                {label: '列名', name: 'name', width: 100},
                {label: '说明', name: 'comments', width: 100, editable: true},
                {label: '物理类型', name: 'jdbcType', width: 100},
                {label: '长度', name: 'length'  , width: 100,  align: 'right'},
                {label: 'Java类型', name: 'javaType', width: 160, editable: true},
                {label: 'Java属性名称', name: 'javaFiled', width: 100, editable: true},
                {label: '可空', name: 'isEmpty', width: 60,editable: true, align:'center',formatter:'sys_dict',formatoptions:{type:'sys_bool'}},
                {label: '查询', name: 'isQuery', width: 60, editable: true, align: 'center'},
                {label: '查询匹配方式', name: 'queryType', width: 100, editable: true, align: 'center'},
                {label: '显示表单类型', name: 'showType', width: 100, editable: true, align: 'center'},
                {label: '字典类型', name: 'dictType', width: 100, editable: true, align: 'center'},
                {label: '排序', name: 'sort', width: 100, editable: true, align: 'center'},
            ],
            ondblClickRow: null
        });

        this.state = {
            tableList : [],
            editData  : null,
            submiting : false
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
        };

        /*获取tableList*/
        u.get($t.encodeUrl('getTableList'),(bean)=>{
            bean.success()?$t.setState({tableList:bean.data}):null;
        })

        $t.loadTableInfo = (name)=>{
            let grid =$t.getGrid();
            grid.setGridParam({postData: {name}});
            grid.trigger('reloadGrid');
        }
    }


    componentWillMount() {
    }

    componentDidMount() {
        this.bindDataOnce();
        this.register(this.props.form);
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
                                        <Select placeholder="请选择表名" allowClear onSelect={this.loadTableInfo}>
                                            {this.state.tableList.map(name=><Option vlaue={name} key={name}>{name}</Option>)}
                                        </Select>
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
                            <Col span={6}>
                                <FormItem label="说明" {...formItemLayout}>
                                    {getFieldDecorator('comments')(
                                        <Input placeholder="说明"/>
                                    )}
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

const DictEdit = Form.create()(GenEditForm);

export default connect(
    mapStateToProps,
    mapActionToProps
)(DictEdit);

