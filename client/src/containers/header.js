import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import config from '../config'
import store from '../store/configure'
import * as type from '../actions/def'
import { message ,Modal} from 'antd';
const confirm = Modal.confirm;



class Header extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(menu) {
        switch(menu.url){
            case 'logout':
                return this.handleLogout(menu.url);
        }
        message.info(menu.name);
    }

    handleLogout(uri) {
        confirm({
            title: '请确认是否要退出?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                store.dispatch({
                    type: type.USER_LOGOUT,
                    uri,
                    ajax_type:'get'
                });
            },
            onCancel() {},
        });
    }
    render() {
        let menus = config.header_menu;
        let key =0;
        return (
            <div className="header">
                <div  className="notice-bar">
                    通知栏
                </div>
                <div className="header-wrapper" >
                    <img src="./images/64.png" alt=""/>
                    <span>工程项目管理系统</span>
                    <ul className="ul list-inline  pull-right flex-vm">
                        {
                        menus.map(m=>(
                            <li className="flex-hvm" key={key++}>
                                <a href="#" className="flex flex-center" onClick={()=>this.handleClick(m)}>
                                    <i className={m.icon}></i>
                                    {m.name}
                                </a>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}


Header.propTypes = {
};


function mapStateToProps(state) {
    return {
    }
}

function mapActionToProps(dispatch) {
    return {}
}


export default connect(
    mapStateToProps,
    mapActionToProps
)(Header);

