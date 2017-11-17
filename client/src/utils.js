import _ from 'lodash'
import { notification } from 'antd';
import Cookies from 'js-cookie';
import gridExtend from './modules/grid/extend'
import React from 'react'
import {Input,Select,Col,Row ,Form} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

let u = {
    baseUrl:'/api/',
    rootLevel:1,    /*树形根层级*/
    rootId:"0",     /*树形根Id*/
    loadSuccess:false,
    _:_,
    cookies:Cookies
};

u.ajax = (options)=>{

    const NO_LOGIN          = -1;
    const SUCCESS           =  0;
    const FAIL              =  1;
    const NO_PERMISSION     =  2;

    $.ajax({
        url         :  options.url,
        type        :  options.type,
        data        :  JSON.stringify(options.data),
        timeout     :  5000,
        contentType :  "application/json;charset=utf-8",
        dataType    :  "json",
        success     :  function(data) {
            let {code} = data;

            if(code !== SUCCESS){
                // notification.success({message:data.msg});
                /*请求时，收到未认证消息就退出登录*/

                if(code===NO_LOGIN){
                    store.dispatch({
                        type:def.USER_LOGOUT
                    })
                }

                notification.error({message:data.msg});
            }

            data.success = ()=>data.code===0;
            if(options.success){
                options.success(data);
            }
        },
        error       : function(error) {
            let msg = '错误代码:'+error.status+',信息：'+ error.statusText;
            notification.error({message:msg});
            let data ={code:FAIL,msg};

            data.success = ()=>data.code===0;
            if(options.success){
                options.success(data);
            }
        }
    });
};

u.get   = (url,data,success)=>{
    if(_.isFunction(data)){
        u.ajax({url,type:'get',success:data});
    }else{
        url = url+'?'+$.param(data);
        u.ajax({url,type:'get',success});
    }
};
u.post  = (url,data,success)=>u.ajax({url,type:'post',data,success});
u.getDict = (type)=>{
    let d =[];

    if(u.loadSuccess){
        let {dicts} = u.system;
        dicts?dicts.forEach(v=>v.type===type?d.push(v):null):null;
    }

    return d;
};

u.getTableColumn = (tableName,columnName)=>{
    let column =null;

    if(u.loadSuccess){
        let {tableColumns} = u.system;

        for(let i=0;i<tableColumns.length;i++){
            let col = tableColumns[i];
            if(col.tableName === tableName && col.name===columnName){
                column = col;
                break;
            }
        }
    }

    return column;
};

u.tip       = (message,type)=>notification[type?type:'success']({message});
u.success   = (msg) =>u.tip(msg,'success');
u.error     = (msg) =>u.tip(msg,'error');

u.configuration = ()=>{
    u.get('api/getConfig',bean=>{
        if(bean.success()){
            u.system   = bean.data;
            u.loadSuccess = true;
            console.log(`请求系统配置完成`,bean);
        }
    });
}
u.online = function(){
    if(u.loadSuccess){
        return;
    }
    /*加载系统配置*/
    let  i = 1 ;
    console.log(`第${i++}次请求系统配置`);
    u.configuration();
    let t = setInterval(function(){
        if(!u.loadSuccess){
            console.log(`第${i++}次请求系统配置`);
            u.configuration();
        }else{
            clearInterval(t);
        }
    },5000);

    gridExtend.call(this);
};

u.outline = function(){
    u.loadSuccess = false;
    u.system   = {};
};


u.render ={};

u.render.text = option=>(<Input placeholder={option.placeholder}/>);

u.render.select = (options)=>{
    let ops = [];
    options.forEach(op=>{
        ops.push(<Option value={op.value}>{op.label}</Option>)
    });

    return <Select children={ops} allowClear placeholder="==请选择=="/>;
};

u.renderFormCtrl = (form,col) => {
    const {getFieldDecorator} = form;
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

u.renderRows = (form,colModel,groupNum) => {
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
            leafs.push(<Col span={24 / groupNum} children={u.renderFormCtrl(form,col)}/>);
        });

        rows.push(<Row children={leafs}/>);
    });

    return rows;
};

export default u;