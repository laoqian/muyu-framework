import React from 'react'
import ReactDom from 'react-dom'
import {Row, Col, Form, Modal,Select,Input} from 'antd'
import _ from 'lodash'
import Loading from './Loading'
import ZtreeSelect from  './ZtreeSelect'

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
    $t.renderCtrls.text = (option)=> (<Input placeholder={option.placeholder} type={option.type}/>);

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

    $t.renderCtrls.treeselect = (column)=>{
        return <ZtreeSelect
                       allowClear
                       placeholder="==请选择==" url={column.editoptions.url} />;
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
            case 'treeselect':
                ctrl = $t.renderCtrls.treeselect(col);
                break;
            case 'text':
            default:
                let type = col.editoptions.type?col.editoptions.type:'text';
                let options = {placeholder: col.label,type};
                ctrl = $t.renderCtrls.text(options);
        }

        col.component = ctrl;

        let options = {},{editrules} =col;
        let data = $t.state.editData;

        options.rules =[];

        if(data && data[col.name] ){
            options.initialValue = _.isNumber(data[col.name])?data[col.name].toString():data[col.name];
        }

        if(editrules){

            if(editrules.required){
                options.rules.push({required:true,message:`${col.label}不能为空！`});
            }

            if(editrules.minLength){
                options.rules.push({min:editrules.minLength,message:`${col.label}长度不能少于${editrules.minLength}！`});
            }

            if(editrules.maxLength){
                options.rules.push({max:editrules.maxLength,message:`${col.label}长度不能大于${editrules.maxLength}！`});
            }

            if(editrules.equal){
                options.rules.push({validator:(rule, value,callback)=>{
                    let {getFieldValue} = form;
                    let value1 = getFieldValue(editrules.equal);
                    let success = false;
                    if(_.isString(value) && _.isString(value1) && value===value1){
                        success = true;
                    }else if(_.isObject(value) && _.isObject(value1) && value.id === value1.id){
                        success = true;
                    }

                    callback(success?undefined:`两次输入的值不相等`);
                }});
            }
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

    $t.defaultSaveData = (url,type,beforeSave,afterSave) => {
        let {validateFields} = $t.props.form;

        validateFields((err,values) => {
            if (!err) {
                let data;

                $t.state.editData = Object.assign($t.state.editData||{}, values);

                data =_.isFunction(beforeSave)? beforeSave($t.state.editData):$t.state.editData;

                u[type||'post']($t.getBaseUrl(url||'save'),data,function(data) {
                    u[data.success()?'success':'error'](data.msg);

                    if(_.isFunction(afterSave)){
                        afterSave(data)
                    }

                    let grid = $t.props.grid;
                    if(grid && data.success()){
                        grid.trigger('reloadGrid');
                    }
                })
            }
        });
    };

    $t.regEvent('willMount',()=>{
        if($t.props.isDialog){
            $t.state.editData = this.props.row||{};
            $t.props.setOkHander($t.defaultSaveData);
        }
    });

    $t.renderModel = (children)=>{
        let style = this.style;
        if (!style) {
            style = {width: '400px', height: '460px'};
        }

        return <Form ref="userForm" className="my-form-square" style={style} children={children}/>;
    };

    if(!$t.render){
        $t.render = () => $t.renderModel(this.renderRows(this.props.form,this.colModel,this.groupNum));
    }
}


export default FormComponent;