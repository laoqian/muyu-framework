import './styles/index.less'
import React from 'react'
import ReactDom, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import {Provider,connect} from 'react-redux';
import store from './store/configure-store'
import Login from './containers/login'
import Header from './containers/header'
import Footer from './containers/footer'
import JqgridWrapper from './containers/jqgrid-wrapper'
import {GET_ARTICLE} from './actions/type-def'
import app_init from './init'
import createHistory from 'history/createBrowserHistory'
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
                    </div>
                    <div className="right-wrapper">
                        <JqgridWrapper/>
                        {/*{this.props.children}*/}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const history = createHistory();

function enter_art_post(state, req) {
    console.log(state);
    console.log(req);
}

class App extends Component {
    render() {
        if(!this.props.user.enabled){
            return <Login/>
        }else{
            return (
                <div>
                    <Router history={history}>
                        <Route path="/" component={MainPage}>
                        </Route>
                    </Router>
                </div>
            )
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
    let DevTools = require('./components/DevTools')
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
