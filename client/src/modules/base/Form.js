import React from 'react'
import {Row, Col, Form, Modal,Select,Input} from 'antd'
import _ from 'lodash'
import Loading from '../../layouts/loading'

const Option = Select.Option;
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

    $t.renderCtrls ={};

    $t.renderCtrls.text = (option)=> (<Input placeholder={option.placeholder}/>);

    $t.renderCtrls.select = (column)=>{
        let ops = [];
        let values = column.editoptions.value;

        if(_.isArray(values)){
            values.forEach(op=>{
                ops.push(<Option value={op.value}>{op.label}</Option>)
            });
        }

        let changeHander = (value)=>{
            let {change} = column.editoptions;
            if(_.isFunction(change)){
               change.call($t,{name:column.name,value});
            }
        };

        return <Select children={ops}
                       onChange={changeHander}
                       disabled={!!column.editoptions.readonly}
                       allowClear
                       placeholder="==请选择=="/>;
    };

    $t.renderFormCtrl = (form,col)=>{
        const {getFieldDecorator} = form;
        let ctrl = null;

        const formItemLayout = {
            labelCol:   {span: 6},
            wrapperCol: {span: 16},
        };

        if(!col.editoptions){
            col.editoptions ={};
        }

        switch (col.edittype) {
            case 'sys_dict':
                col.editoptions.value =u.getDict(col.editoptions.type);
                col.edittype = 'select';
                ctrl = $t.renderCtrls.select(col);
                break;
            case 'select':
                ctrl = $t.renderCtrls.select(col);
                break;
            case 'text':
            default:
                let options = {placeholder: col.label};
                ctrl = $t.renderCtrls.text(options);
        }

        col.component = ctrl;

        let options = {},{editrules} =col;
        options.rules =[];

        if(editrules && editrules.required){
            let data = $t.state.editData;

            options.initialValue =data &&data[col.name]?data[col.name].toString():null;
            options.rules.push({required:true,message:`${col.label}不能为空！`});
        }

        return <FormItem label={col.label} {...formItemLayout}
                         children={getFieldDecorator(col.name,options)(ctrl)}/>;
    };

    $t.renderRows = (form,colModel,groupNum)=>{
        let rows = [];
        let columns = [];

        colModel.forEach(col => {
            if (col.editable) {
                columns.push(col);
            }
        });

        if (!columns || columns.length === 0) {
            return rows;
        }

        groupNum = !groupNum ? 1 : groupNum;

        let list = _.chunk(columns, groupNum);

        list.forEach(cols => {
            let leafs = [];
            cols.forEach(col => {
                leafs.push(<Col span={24 / groupNum} children={$t.renderFormCtrl(form,col)}/>);
            });

            rows.push(<Row children={leafs}/>);
        });

        return rows;
    };

    $t.modalClick = (type) => {
        if (type === 'ok') {
            $t.setState({submiting: true});

            if(!_.isFunction($t.saveData)){
                $t.defaultSaveData();
            }else{
                $t.saveData();
            }
        } else {
            $t.props.history.push('/');
        }
    };

    $t.defaultSaveData = (url,type,beforeSave,afterSave) => {
        let {validateFields} = $t.props.form;

        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (!$t.state.editData) {
                    $t.state.editData = {};
                }
                let data;
                $t.state.editData = Object.assign($t.state.editData, values);
                if (_.isFunction(beforeSave)) {
                    data = beforeSave($t.state.editData);
                    console.log(data);
                }else{
                    data = $t.state.editData;
                }
                if(!type){
                    type = 'get';
                }

                u[type]($t.encodeUrl(url ? url : 'save'), data, function (data) {
                    if (data.success()) {
                        u.success(data.msg);
                    }else{
                        u.error(data.msg);
                    }

                    if(_.isFunction(afterSave)){
                        afterSave(data);
                    }

                    $t.setState({submiting:false});
                })
            }
        });
    };

    $t.bindDataOnce = () => {
        let {row, type} = $t.props.location;

        if (!$t.props.location.binded) {
            $t.props.location.binded = true;

            if(_.isFunction($t.beforeBindData)){
                $t.beforeBindData(type,row);
            }
            switch (type) {
                case 'add':
                    if(_.isFunction($t.setDefaultData)){
                        $t.state.editData = $t.setDefaultData(row);
                    }else if(row){
                        row.id = null;
                        $t.state.editData = row;
                    }
                    break;
                case 'modify':
                    $t.state.editData = row;
                    break;
            }
        }
    };

    $t.title = () => {
        let {type,binded} = $t.props.location;
        if (binded) {
           return $t.moduleName+(type==='modify'?`修改-${this.state.editData.id}`:'添加');
        }else{
            return $t.moduleName + '添加';
        }
    };

    $t.componentWillMount = () => {
        $t.bindDataOnce();
    };

    $t.componentDidUpdate = () => {

    };

    $t.componentWillReceiveProps = () => {
        $t.bindDataOnce();
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
                    <Form ref="userForm" className="my-form-square" style={style} children={this.u.renderRows(this.props.form,this.colModel,this.groupNum)}/>
                    {this.loadingData ? <Loading isLayerHide={true} text={this.state.loadingText}/> : ''}
                </Modal>
            )
        };
    };
}


export default FormComponent;