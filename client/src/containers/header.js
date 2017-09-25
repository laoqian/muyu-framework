import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import config from '../config'
import store from '../store/configure-store'
import * as type from '../actions/type-def'

class Header extends Component {
    click(){
        store.dispatch({
            type: type.GET_ADMIN,
            uri:'admin',
            ajax_type:'get'
        });

        return false;
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
                                <Link to="#" className="flex flex-center" onClick={this.click}>
                                    <i className={m.icon}></i>
                                    {m.name}
                                </Link>
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

