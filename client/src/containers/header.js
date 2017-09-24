import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import config from '../config'

class Header extends Component {
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
                        menus.map(menu=>(
                            <li className="flex-hvm" key={key++}>
                                <Link to={menu.url} className="flex flex-center">
                                    <i className={menu.icon}></i>
                                    {menu.name}
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

