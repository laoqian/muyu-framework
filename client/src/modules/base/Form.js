import React from 'react'
import {Row, Col, Form, Modal} from 'antd'
import _ from 'lodash'
import Loading from '../../layouts/loading'

const FormItem = Form.Item;

let FormComponent = function (){
    let $t  = this;
    let {u} = this;
    let state ={
        editData: null,
        submiting: false
    };

    if($t.state){
        Object.assign($t.state,state)
    }else{
        $t.state =state;
    }

    $t.modalClick = (type) => {
        if (type === 'ok') {
            $t.setState({submiting: true});
            $t.saveData();
        } else {
            $t.props.history.push('/');
        }
    };

    $t.saveData = (url, beforeSave) => {
        let {validateFields} = $t.props.form;

        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (!$t.state.editData) {
                    $t.state.editData = {};
                }

                Object.assign($t.state.editData, values);
                if (beforeSave) {
                    $t.state.editData = beforeSave($t.state.editData);
                }

                u.post($t.encodeUrl(url ? url : 'save'), $t.state.editData, function (data) {
                    if (data.code === 0) {
                        let {grid} = $t.props.location;

                        u.success(data.msg);
                        $t.props.history.push('/');
                        grid.trigger('reloadGrid');
                    } else {
                        u.error(data.msg);
                    }

                    $t.setState({submiting: false});
                })
            }
        });
    };

    $t.filter = row => {
        let data = {};
        $t.colModel.forEach(col => {
            if (col.editable) {
                data[col.name] = row[col.name];
            }
        });

        return data;
    };

    $t.bindDataOnce = () => {
        let {row, type} = $t.props.location;
        const {setFieldsValue} = $t.props.form;

        if (!$t.props.location.binded) {
            $t.props.location.binded = true;

            switch (type) {
                case 'add':
                    if (row) {
                        $t.state.editData = {parentId: row.parentId};
                        setFieldsValue($t.filter(row));
                    }
                    break;
                case 'modify':
                    $t.state.editData = row;
                    setFieldsValue($t.filter(row));
                    break;
            }
        }
    };

    $t.renderFormCtrl = (col) => {
        const {getFieldDecorator} = this.props.form;
        let ctrl = null;
        let options;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16},
        };

        switch (col.edittype) {
            case 'sys_dict':
                ctrl = u.render.select(u.getDict(col.editoptions.type));
                break;
            case 'select':
                ctrl = u.render.select(u.editoptions.value);
                break;
            case 'text':
            default:
                options = {placeholder: col.label};
                ctrl = u.render.text(options);
        }

        return <FormItem label={col.label} {...formItemLayout}
                         children={getFieldDecorator(col.name, {required: true})(ctrl)}/>;
    };

    $t.renderRows = () => {
        let rows = [];
        let {groupNum} = $t;
        let columns = [];

        $t.colModel.forEach(col => {
            if (col.editable) {
                columns.push(col);
            }
        });

        if (!columns || columns.length === 0) {
            return children;
        }

        groupNum = !groupNum ? 1 : groupNum;
        let span = 24 / groupNum;

        let list = _.chunk(columns, groupNum);

        list.forEach(cols => {
            let leafs = [];
            cols.forEach(col => {
                leafs.push(<Col span={span} children={$t.renderFormCtrl(col)}/>);
            });

            rows.push(<Row children={leafs}/>);
        });

        return rows;
    };

    $t.title = () => {
        let title = $t.moduleName + '添加';
        let {type,binded} = $t.props.location;

        if (binded) {
            switch (type) {
                case 'modify':
                    title = $t.moduleName + `修改-${this.state.editData.id}`;
                    break;
                case 'add':
                    title = $t.moduleName + '添加';
                    break;
            }
        }

        return title;
    };

    $t.componentDidMount = () => {
        $t.bindDataOnce();
    };

    $t.componentDidUpdate = () => {
        $t.bindDataOnce();
    };
    $t.componentWillReceiveProps = () => {
        $t.state.submiting = false;
    };

    if(!$t.render){
        $t.render = () => {
            let style = this.style;
            if (!style) {
                style = {width: '400px', height: '460px'};
            }

            return (
                <Modal
                    title={this.title()}
                    wrapClassName="vertical-center-modal"
                    visible={true}
                    onOk={() => this.modalClick('ok')}
                    onCancel={() => this.modalClick('cancel')}
                    confirmLoading={this.state.submiting}
                >
                    <Form ref="userForm" className="my-form-square" style={style} children={this.renderRows()}/>
                    {this.loadingData ? <Loading isLayerHide={true} text={this.state.loadingText}/> : ''}
                </Modal>
            )
        };
    };
}


export default FormComponent;