import React from 'react'
import {connect} from 'react-redux'
import BaseComponent from "../../base/BaseComponent";
import {Form,Upload,Icon,Button} from 'antd'
import Loading from '../../base/Loading'

class UserInfo extends BaseComponent{

    constructor(props){
        super(props);
        let $t = this;
        $t.baseUrl    = '/api/user/';
        $t.moduleName = 'sysUser';
        $t.state.photoUrl = this.props.user.photo;

        $t.handleChange = (info) => {
            const bean = info.file.response;

            if (info.file.status === 'done' && $t.u.authVarify(bean.code)) {
                let attach = bean.data;
                let state ={photoUrl:$t.encodeFileUrl("/"+attach.name)};
                $t.setState(state);
            }
        };

        $t.beforeUpload =(file)=>{
            const isJPG = file.type === 'image/jpeg';
            if (!isJPG) {
                return $t.u.error('只能上传jpg格式头像!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                return $t.u.error('头像大小不能超过2MB!');
            }
            return isJPG && isLt2M;
        };

        $t.saveUser = ()=>{

            let user = {
                photo:$t.state.photoUrl,
                email:$t.refs.email.value,
                phone:$t.refs.phone.value,
                mobile:$t.refs.mobile.value,
                remarks:$t.refs.remarks.value
            };
            user = Object.assign({},this.props.user,user);
            Loading.show("保存用户数据");
            $t.u.post($t.encodeBaseUrl('/user/save'),user,bean=>{
                if(bean.success()){
                    $t.u.success(bean.msg);
                }

                Loading.hide();
            })
        }
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
                                <img src={this.state.photoUrl} alt="" className="my-user-photo" />
                                <Upload
                                    name="file"
                                    showUploadList={false}
                                    action={this.encodeBaseUrl('/attach/upload')}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    <Button>
                                        <Icon type="upload" />上传
                                    </Button>
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
                                <input type="text" placeholder="邮箱" defaultValue={user.email} ref="email"  className="ant-input ant-input-lg"/>
                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="phone"  title="电话">电话</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <input type="text" placeholder="电话" defaultValue={user.phone} ref="phone"  className="ant-input ant-input-lg"/>
                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="mobile"  title="手机">手机</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <input type="text" placeholder="手机" defaultValue={user.mobile} ref="mobile"  className="ant-input ant-input-lg"/>

                            </div>
                        </div>
                    </div>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col-8 ant-form-item-label">
                            <label form="remarks"  title="备注">备注</label>
                        </div>
                        <div className="ant-col-16 ant-form-item-control-wrapper">
                            <div className="ant-form-item-control ">
                                <textarea type="text" placeholder="备注" defaultValue={user.remarks} ref="remarks"  className="ant-input ant-input-lg"/>
                            </div>
                        </div>
                    </div>
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


UserInfo =  connect(state=>(
    {
        user        :   state.user
    }),dispatch=>({
}))(UserInfo);

export default UserInfo;
