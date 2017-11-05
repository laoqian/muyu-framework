import './styles/index.less'
import React,{Component} from 'react'
import {render} from 'react-dom'
import {Provider,connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Layout, Menu, Icon,Tabs } from 'antd'
import BaseComponent  from './modules/base/BaseComponent'
import store from './redux/store/configure'
import Login from './layouts/login'
import {tabAdd,tabDelete,tabSel} from './redux/actions/tabs'
import {userAuth} from './redux/actions/user'

const TabPane = Tabs.TabPane;

const { Header, Content,Sider } = Layout;
const { SubMenu } = Menu;
class App extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {collapsed: false,activeMenu:"1"};
        let {tabAdd} = this.props;

        this.onCollapse = collapsed => this.setState({collapsed});
        this.navClick = menu =>this.setState({activeMenu:menu.key});
        this.handleClick = menu => tabAdd(_.find(this.props.user.menuList, chr => chr.id === menu.key));
        this.getSubMenuList = id => _.filter(this.props.user.menuList, m => m.parentId === id);
        this.getPage = href=>{
            try{
                let Page = require('./modules'+href).default;
                return <Page/>;
            }catch(err){
                return (
                    <div className="my-col-full flex-hvm" >
                        <div >
                            <img src="./images/nodata.jpg" alt=""/>
                            <h4 style={{padding:'20px'}}>{err.toString()}</h4>
                        </div>
                    </div>
                );
            }
        };

        this.onEdit = (id, action) => {
            if(action ==='remove'){
                this.props.tabDelete({id})
            }
        };

        this.onTabClick = (id) =>this.props.tabSel({id});
    }

    componentDidMount(){
        let u = this.u;
        let username = u.cookies.get('username');
        let password = u.cookies.get('password');
        if(username &&　password){
            let {userAuth} = this.props;
            userAuth(username,password);
        }

    }

    componentDidUpdate(prevProps, prevState){
        let user = this.props.user;
        user.enabled?this.u.online.call(this):this.u.outline();
    }

    render() {
        let user = this.props.user;

        if(!user.enabled){
            return <Login/>
        }else{
            let penes = this.props.tabs.penes;

            return (
                <Layout style={{ minHeight: '100vh' }}>
                    <Header>
                        <div className="logo" ><h4>木鱼快速开发框架</h4></div>
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            onClick={this.navClick}
                        >
                            {
                                this.getSubMenuList("0").map((menu)=>(
                                    <Menu.Item key={menu.id}>
                                        <Icon type={menu.icon} />
                                        {menu.name}
                                    </Menu.Item>
                                ))
                            }
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider   collapsible
                                 collapsed={this.state.collapsed}
                                 onCollapse={this.onCollapse}
                        >
                            <Menu
                                onClick={this.handleClick}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['1']}
                                mode="inline"
                            >
                                {
                                    this.getSubMenuList(this.state.activeMenu).map((menu)=>(
                                        <SubMenu key={menu.id} title={
                                            <span>
                                                <Icon type={menu.icon}/>
                                                <span>{menu.name}</span>
                                            </span>}>
                                            {
                                                this.getSubMenuList(menu.id).map((sub)=>(
                                                    <Menu.Item key={sub.id}>{sub.name}</Menu.Item>
                                                ))
                                            }
                                        </SubMenu>
                                    ))
                                }
                            </Menu>
                        </Sider>
                        <Content>
                            <Tabs
                                type="editable-card"
                                tabBarStyle={{'padding':'10px 10px 0 10px'}}
                                activeKey={this.props.tabs.activeKey}
                                hideAdd={true}
                                onEdit={this.onEdit}
                                onTabClick={this.onTabClick}
                                animated={true}
                            >
                                {penes.map(pane =><TabPane tab={pane.name} key={pane.id} closable={true}>
                                    {this.getPage(pane.href)}
                                </TabPane>)}
                            </Tabs>
                        </Content>
                    </Layout>
                </Layout>
            )
        }
    }
}


App =  connect(state=>(
    {
        user        :   state.user,
        tabs        :   state.tabs
    }),dispatch=>({
    userAuth        :   bindActionCreators(userAuth   ,   dispatch),
    tabAdd          :   bindActionCreators(tabAdd     ,   dispatch),
    tabDelete       :   bindActionCreators(tabDelete  ,   dispatch),
    tabSel          :   bindActionCreators(tabSel     ,   dispatch)
}))(App);


if (__DEV__) {
    let DevTools = require('./layouts/dev-tools')
    render(
        <Provider store={store}>
            <div>
                <App/>
                {/*<DevTools/>*/}
            </div>
        </Provider>,
        document.getElementById('root')
    );
} else {
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );
}
