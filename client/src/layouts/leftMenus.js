import React, {Component, PropTypes} from 'react'
import {Menu, Icon} from 'antd';
import {getUserMenuList} from '../redux/actions/menu'
import {tabAdd} from '../redux/actions/tabs'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import _ from 'lodash'
import {Spin}  from 'antd'

const SubMenu = Menu.SubMenu;

class MenuList extends Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.getUserMenuList();
    }

    getSubMenuList(id){
        return _.filter(this.props.menuList, function (m) {
            return m.parentId === id;
        }) ;
    }

    handleClick(menu){
        let selected = _.find(this.props.menuList, function(chr){
            return chr.id === menu.key;
        });

        this.props.tabAdd(selected);
    }

    render() {
        if(this.props.menuList.length===0){
            let style ={width:'100%',height:'100%'};
            return (<div className="flex-hvm" style={style}>
                        <Spin size="large" />
                    </div>)
        }else{
            return (
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 240 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['1']}
                    mode="inline"
                >
                    {
                        this.getSubMenuList("0").map((menu)=>(
                            <SubMenu key={menu.id} title={<span><Icon type="mail" /><span>{menu.name}</span></span>}>
                                    {
                                        this.getSubMenuList(menu.id).map((sub)=>(
                                            <Menu.Item key={sub.id}>{sub.name}</Menu.Item>
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
        getUserMenuList : bindActionCreators(getUserMenuList, dispatch),
        tabAdd          : bindActionCreators(tabAdd, dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(MenuList);

