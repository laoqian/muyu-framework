import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { Button,Icon } from 'antd';



class Modal extends Component {
    constructor(){
        super();
        this.defaultOptions = {
            title:'系统提示',
            isCloseEnabled:true,
            iconType:'success',
            cancelText:'取消',
            okType:'primary',
            okText:'确定',
            maskClosable:false,
            content:'',
            onOk:function () {

            },
            onCancel:function () {
                
            }
        }
    }

    render() {
        let options = Object.assign(this.defaultOptions,this.props.options);
        let icon;
        if(options.iconType==='success'){
        }
        return (
            <div className="my-full-layer">
                <div className="my-modal-wrapper">
                    <div className="my-modal-title">
                        <span>{options.title}</span>
                        {options.isColseEnabled?<Icon type="close" />:''}
                    </div>

                    <div className="my-modal-content">
                        <Icon type="exclamation-circle-o" />
                        <span>你确定要退出登录吗?</span>
                    </div>
                    <div className="my-modal-footer">
                        <Button type="primary">确定</Button>
                        <Button>取消</Button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapActionToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(Modal);

