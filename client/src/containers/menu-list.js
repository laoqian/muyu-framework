import React, {Component, PropTypes} from 'react'
import {Menu, Icon} from 'antd';
import {get_user_menu_list} from '../actions/menu'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import _ from 'lodash'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class MenuList extends Component {

    componentDidMount(prevProps, prevState) {
        this.props.get_user_menu_list();
    }

    getSubMenuList(id){
        return _.filter(this.props.menuList, function (m) {
            return m.parentId === id;
        }) ;
    }

    render() {
        if(this.props.menuList.length===0){
            return (<div>
                加载菜单，请稍候...
            </div>)
        }else{
            return (
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 240 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    {
                        this.getSubMenuList("1").map((menu)=>(
                            <SubMenu key={menu.id} title={<span><Icon type="mail" /><span>{menu.name}</span></span>}>
                                    {
                                        this.getSubMenuList(menu.id).map((sub)=>(
                                            <Menu.Item key={'it'+sub.id}>{sub.name}</Menu.Item>
                                        ))
                                    }
                            </SubMenu>
                        ))
                    }
                </Menu>
            )
        }
    }
}


MenuList.propTypes = {
    menuList:PropTypes.array.isRequired
};


function mapStateToProps(state) {
    return {
        menuList:state.menu.list
    }
}

function mapActionToProps(dispatch) {
    return {
        get_user_menu_list: bindActionCreators(get_user_menu_list, dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(MenuList);

