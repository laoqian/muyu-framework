import React, {Component, PropTypes} from 'react'
import {Menu, Icon} from 'antd';
import {get_user_menu_list} from '../actions/menu'
import {bindActionCreators} from 'redux';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class MenuList extends Component {

    componentDidMount(prevProps, prevState) {

    }

    render() {

        return (
            <div>
                <table id="dataGrid" style={{'width': '100%', 'height': '100%'}}></table>
                <div id="jqGridPager"></div>
            </div>
        )
    }
}


MenuList.propTypes = {
    menuList:PropTypes.array.isRequired
};


function mapStateToProps(state) {
    return {
        menuList:state.menu.cur_user_menu_list
    }
}

function mapActionToProps(dispatch) {
    return {
        get_user_menu_list: bindActionCreators(get_user_menu_list, dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(MenuList);

