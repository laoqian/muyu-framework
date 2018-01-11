import './styles/index.less'
import React,{Component} from 'react'
import {render} from 'react-dom'
import {Provider,connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Layout, Menu, Icon,Tabs,Dropdown } from 'antd'
import BaseComponent  from './modules/base/BaseComponent'
import store from './redux/store/configure'
import Login from './layouts/login'
import {tabAdd,tabDelete,tabSel} from './redux/actions/tabs'
import {userAuth,userLogout} from './redux/actions/user'
import { notification } from 'antd';
import gridExtend from './modules/grid/extend'

const TabPane = Tabs.TabPane;

const { Header, Content,Sider } = Layout;
const { SubMenu } = Menu;

class App extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {collapsed: false,activeMenu:"1"};
        let {tabAdd} = this.props,$t = this,gridExtendInit = gridExtend.bind(this);

        this.onCollapse = collapsed => this.setState({collapsed});
        this.navClick = menu =>this.setState({activeMenu:menu.key});
        this.handleClick = menu => tabAdd(_.find(this.props.user.menuList, chr => chr.id === menu.key));
        this.getSubMenuList = id => _.filter(this.props.user.menuList, m => m.parentId === id);
        this.getPage = href=>{
            try{
                let Page = require('./modules'+href).default;
                return <Page/>;
            }catch(err){
                console.error(err);
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

        this.dropClick = (drop)=>this.dropHander[drop.key]?this.dropHander[drop.key](): console.error('Warning:未定义的下拉菜单事件：' + drop.key);

        this.dropHander = {};
        this.dropHander.set = ()=>{

        };

        this.dropHander.logout = ()=>this.props.userLogout();

        this.after = ()=>{
            let user = this.props.user;
            this.u.user = user;

            if(user.enabled){
                this.u.online(()=>{
                    gridExtendInit();
                    $t.websocketStart();
                    tabAdd({href:'/sys/index/index',fixed:true,name:'系统主页'});
                });
            }else{
                this.u.outline();
            }
        };

        this.websocketStart = function(){
            let baseUrl = location.href;
            baseUrl = baseUrl.replace('http','ws');
            let url = baseUrl+'/muyu-websocket';
            let ws  = new WebSocket(url);
            $t.client = Stomp.over(ws);
            $t.client.debug = ()=>{}; //重置stomp控制台输出
            $t.client.connect({}, ()=>{
                $t.client.subscribe('/topic/syncTime', function(frame){
                    let msg  = JSON.parse(frame.body);
                    $t.setState({serverDate:msg.date});
                });
            },(err)=>{
                console.log('连接服务器失败',err);
            });
        };

        this.regEvent('didMount',()=>{
            let u = this.u;
            let username = u.cookies.get('username');
            let password = u.cookies.get('password');
            if(username &&　password){
                let {userAuth} = this.props;
                userAuth({username,password});
            }

            /*通知框初始化*/
            notification.config({
                placement:'bottomRight',
                bottom: 50,
                duration: 3,
            });
            this.after();
        });

        this.regEvent('didUpdate',()=>{
            this.after();
        });
    }

    render() {
        let user = this.props.user;
        const dropMenu = (
            <Menu onClick={this.dropClick}>
                <Menu.Item key="set">
                    <Icon type="menu-fold"/>
                    系统设置
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout">
                    <Icon type="poweroff"/>
                    安全退出
                </Menu.Item>
            </Menu>
        );

       let navList = _.sortBy(this.getSubMenuList("0"),item=>item.sort);

        if(!user.enabled){
            return <Login/>
        }else{
            let penes = this.props.tabs.penes;

            return (
                <Layout style={{ minHeight: '100vh' }}>
                    <Header>
                        <div className="my-logo" ><h4>木鱼快速开发框架</h4></div>
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            onClick={this.navClick}
                        >
                            {
                                navList.map((menu)=>(
                                    <Menu.Item key={menu.id}>
                                        <Icon type={menu.icon} />
                                        {menu.name}
                                    </Menu.Item>
                                ))
                            }
                        </Menu>
                        <div className="my-user">
                            <div style={{marginRight:"5px"}}>
                                {this.state.serverDate}
                            </div>
                            <div className="my-user-info">
                                <img src={user.photo}/>
                                <Dropdown overlay={dropMenu} placement="bottomRight">
                                    <span>超级用户</span>
                                </Dropdown>
                            </div>
                        </div>
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
        serverTime  :   state.serverTime,
        tabs        :   state.tabs
    }),dispatch=>({
    userAuth        :   bindActionCreators(userAuth   ,   dispatch),
    userLogout      :   bindActionCreators(userLogout ,   dispatch),
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
