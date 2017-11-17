import React                                    from 'react'
import {connect}                                from 'react-redux'
import {Form, Input, Modal, Row, Col,Select}    from 'antd';
import {userGet}                                from '../../../redux/actions/user'
import {notification}                           from 'antd';
import JqgridWrapper                            from '../../grid/index'
import BaseComponent                            from "../../base/BaseComponent";
import u                                        from '../../../utils'
import colModel                                 from './tableColModel'

const FormItem  = Form.Item;
const Option    = Select.Option;

class GenEditForm extends BaseComponent {
    constructor(props) {
        super(props);
        let $t = this;

        $t.extend("List","Form");
        $t.baseUrl      = '/api/gen/';
        $t.moduleName   = 'sysGenEdit';

        $t.setGridInitParam({
            url             : $t.encodeUrl('findTableColumn'),
            baseUrl         : $t.baseUrl,
            gridName        : this.moduleName,
            inlineEdit      : true,
            ExpandColumn    : 'name',
            pagerAble       : false,
            rownumbers      : false,
            colModel        : colModel,
            ondblClickRow   : null
        });

        this.state.tableList = [];

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
                let list  = this.getGrid().getRowData(null,true);

                u.post(this.encodeUrl('saveBatch'),{data,list},function(data){
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


        /*获取tableList*/
        u.get($t.encodeUrl('getTableList'),(bean)=>{
            bean.success()?$t.setState({tableList:bean.data}):null;
        });

        $t.loadTableInfo = (tableName)=>{
            let grid =$t.getGrid();
            grid.setGridParam({postData: {tableName}});
            grid.trigger('reloadGrid');
        }
    }

    componentDidMount() {
        this.bindDataOnce();
        this.register(this.props.form);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16},
        };

        return (
            <Modal
                title={this.title()}
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
                                <FormItem label="包名" {...formItemLayout}>
                                    {getFieldDecorator('packageName', {
                                        rules: [{required: true, message: '请输入有效的类名!'}],
                                        initialValue:"bus"
                                    })(
                                        <Input placeholder="包名"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="类名" {...formItemLayout}>
                                    {getFieldDecorator('className', {
                                        rules: [{required: true, message: '请输入有效的类名!'}],
                                        initialValue:"User"
                                    })(
                                        <Input placeholder="类名"/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <FormItem label="类型" {...formItemLayout}>
                                    {getFieldDecorator('type',{initialValue:"0"})(
                                        <Select placeholder="类型" >
                                            <Option value="0">普通</Option>
                                            <Option value="1">树形</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="编辑类型" {...formItemLayout}>
                                    {getFieldDecorator('editType',{initialValue:"0"})(
                                        <Select placeholder="编辑类型" >
                                            <Option value="0">弹出编辑框</Option>
                                            <Option value="1">行内编辑</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="生成类型" {...formItemLayout}>
                                    {getFieldDecorator('genType',{initialValue:"3"})(
                                        <Select placeholder="生成类型" >
                                            <Option value="0">仅保存配置</Option>
                                            <Option value="1">仅生成服务端代码</Option>
                                            <Option value="2">仅生成客户端代码</Option>
                                            <Option value="3">全部生成</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
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

export default  Form.create()(GenEditForm);

