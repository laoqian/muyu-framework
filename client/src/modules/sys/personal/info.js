import React from 'react'
import {connect} from 'react-redux'
import BaseComponent from "../../base/BaseComponent";
import {Form,Upload,Icon} from 'antd'

class UserInfo extends BaseComponent{

    constructor(props){
        super(props);
        let $t = this;
        $t.bindDataOnce = ()=>{};
        $t.baseUrl    = '/api/user/';
        $t.moduleName = 'sysUser';

        $t.toolBarOptions = {
            right:{
                items :[
                    {name: '保存',path:'/add',   icon: 'save',    },
                ]
            }
        };

        $t.state.editData  = $t.props.user;

        $t.getBase64 = (img,callback)=> {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        };

        $t.handleChange = (info) => {
            if (info.file.status === 'done') {
                getBase64(info.file.originFileObj,imageUrl => this.setState({ imageUrl }));
            }
        }
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            this.u.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            this.u.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    render() {

        let style ={
            flex:1,
            width: '100%',
            'paddingTop': '20px'
        };
        const imageUrl = this.state.imageUrl;
        let {user} = this.props;

        return (
            <div className="my-col-full" >
                <Form ref="userForm" style={style} className="my-user-info" >
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="photo" title="头像">头像</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <Upload
                                    className="avatar-uploader"
                                    name="file"
                                    showUploadList={false}
                                    action={this.encodeBaseUrl('/upload')}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {
                                        imageUrl ?
                                            <img src={imageUrl} alt="" className="avatar" /> :
                                            <Icon type="plus" className="avatar-uploader-trigger" />
                                    }
                                </Upload>
                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="company.name" title="归属公司">归属公司</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                {user.company.name}
                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="office.name"  title="归属部门">归属部门</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                {user.office.name}
                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="name"  title="名称">姓名</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                {user.name}
                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="email"  title="邮箱">邮箱</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <input type="text" placeholder="邮箱" value={user.email} id="email"  className="ant-input ant-input-lg"/>
                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="phone"  title="电话">电话</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <input type="text" placeholder="电话" value={user.phone} id="phone"  className="ant-input ant-input-lg"/>
                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="mobile"  title="手机">手机</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <input type="text" placeholder="手机" value={user.mobile} id="mobile"  className="ant-input ant-input-lg"/>

                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="remarks"  title="备注">备注</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <textarea type="text" placeholder="备注" value={user.remarks} id="mobile"  className="ant-input ant-input-lg"/>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}


UserInfo =  connect(state=>(
    {
        user        :   state.user
    }),dispatch=>({
}))(UserInfo);

export default UserInfo;
