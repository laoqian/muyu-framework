import './styles/index.less'
import React from 'react'
import ReactDom, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import {Provider,connect} from 'react-redux';
import store from './redux/store/configure'
import Login from './layouts/login'
import Header from './layouts/header'
import Footer from './layouts/footer'
import MenuList from './layouts/leftMenus'
import ContentWrapper from './layouts/rightContent'
import appInit from './init'
import {Router,Route, Link} from 'react-router-dom'

appInit(store);

class App extends Component {

    render() {
        if(!this.props.user.authed.enabled){
            return <Login/>
        }else{
            return (
                <div className="flex flex-center">
                    <Header/>
                    <div>
                        <div className="left-wrapper">
                            <MenuList/>
                        </div>
                        <div className="right-wrapper">
                            <ContentWrapper/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

App =  connect(state=>({user:state.user}),dispatch=>({}))(App);

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
