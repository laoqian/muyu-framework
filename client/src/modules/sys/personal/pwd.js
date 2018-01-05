import React from 'react'
import {connect} from 'react-redux'
import BaseComponent from "../../base/BaseComponent";
import {Form,Upload,Icon,Button} from 'antd'
import Loading from '../../base/Loading'

class UserPassword extends BaseComponent{

    constructor(props){
        super(props);
        let $t = this;

        this.extend("Form");

        $t.moduleName = 'sysUser';

        $t.colModel = [
            {label: '原密码', name: 'password'  , width: 200,editable:true,editrules:{required:true,minLength:3,maxLength:20},editoptions:{type:'password'}},
            {label: '新密码', name: 'newPassword'  , width: 200,editable:true,editrules:{required:true,minLength:3,maxLength:20},editoptions:{type:'password'}},
            {label: '重复新密码', name: 'newPassword1' , width: 200,editable:true,editrules:{required:true,minLength:3,maxLength:20,equal:'newPassword'},
                editoptions:{type:'password'}},
        ];

        $t.saveUser = ()=>{
            $t.defaultSaveData("user/changePassword",'get',(data)=>{
                data.id = this.props.user.id;
                return data;
            });
        }
    }

    render() {

        let style ={
            flex:1,
            width: '100%',
            'paddingTop': '20px'
        };

        return (
            <div className="my-col-full" >
                <Form ref="userForm" style={style} className="my-user-info" >
                    {this.renderRows(this.props.form,this.colModel,1)}
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <Button onClick={()=>this.saveUser()}>
                                    <Icon type="save" />保存
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}


UserPassword =  connect(state=>(
    {
        user        :   state.user
    }),dispatch=>({
}))(UserPassword);


export default Form.create()(UserPassword);
