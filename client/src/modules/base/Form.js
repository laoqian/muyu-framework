import React from 'react'
import {Row, Col, Form, Modal,Select,Input} from 'antd'
import _ from 'lodash'
import Loading from '../../layouts/loading'

const Option = Select.Option;
const FormItem = Form.Item;

let FormComponent = function (){
    let $t  = this;
    let {u} = this;

    $t.componentCheck();

    let state ={
        editData: null,
        submiting: false
    };

    Object.assign($t.state,state);

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

            options.initialValue =data && data[col.name]!==undefined?data[col.name].toString():null;
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
                let data;

                $t.state.editData = Object.assign($t.state.editData?$t.state.editData:{}, values);
                data =_.isFunction(beforeSave)? beforeSave($t.state.editData):$t.state.editData;

                u[!type?'get':type]($t.encodeUrl(url ? url : 'save'), data, function (data) {
                    u[data.success()?'success':'error'](data.msg);

                    if(_.isFunction(afterSave)){
                        afterSave(data)
                    }
                    let grid = $t.props.location.grid;
                    if(grid){
                        grid.trigger('reloadGrid');
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
            _.isFunction($t.beforeBindData)? $t.beforeBindData(type,row):null;

            if(type==='添加'){
                row?row.id=null:row={};
                $t.state.editData =_.isFunction($t.setDefaultData)? $t.setDefaultData(row):row;
            }else{
                $t.state.editData = row;
            }
        }
    };

    $t.title = () => {
        let {type,binded} = $t.props.location;
        if (binded) {
           return $t.moduleName+(type!=='添加'?`${type}-${this.state.editData.id}`:'添加');
        }else{
            return $t.moduleName + '添加';
        }
    };


    $t.regEvent('willMount',()=>{
        console.log('willMount');
        $t.bindDataOnce();
    });

    $t.regEvent('willReceiveProps',()=>{
        $t.bindDataOnce();
        $t.state.submiting = false;
    });

    $t.renderModel = (children)=>{
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
                <Form ref="userForm" className="my-form-square" style={style} children={children}/>
                {this.loadingData ? <Loading isLayerHide={true} text={this.state.loadingText}/> : ''}
            </Modal>
        )
    };

    if(!$t.render){
        $t.render = () => $t.renderModel(this.renderRows(this.props.form,this.colModel,this.groupNum));
    }
}


export default FormComponent;