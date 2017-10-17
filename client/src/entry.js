import './styles/index.less'
import React from 'react'
import ReactDom, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import {Provider,connect} from 'react-redux';
import store from './redux/store/configure'
import Login from './containers/login'
import Header from './containers/header'
import Footer from './containers/footer'
import MenuList from './containers/menu-list'
import ContentWrapper from './containers/content-wrapper'
import {GET_ARTICLE} from './redux/actions/def'
import app_init from './init'
import {Router, Route, Link} from 'react-router-dom'


app_init(store);

const article_get = (nextState, replace) => {
    let id = nextState.params.articleid;

    if (id) {
        store.dispatch({
            type: GET_ARTICLE,
            ajax_type: 'post',
            data: {article_id: id},
            uri: '/article_get'
        });
    }
    return true;
}


class MainPage extends Component {

    render() {
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



class App extends Component {

    render() {
        if(!this.props.user.authed.enabled){
            return <Login/>
        }else{
            return <MainPage/>
        }
    }
}

function mapStateToProps(state) {

    return {
        user: state.user
    }
}

function mapActionToProps(dispatch) {
    return {
    }
}

App =  connect(mapStateToProps, mapActionToProps)(App);

if (__DEV__) {
    let DevTools = require('./components/dev-tools')
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
