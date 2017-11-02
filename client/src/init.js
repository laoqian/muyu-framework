import {userAuth} from './redux/actions/user'
import Cookies from 'js-cookie';
import { notification } from 'antd';
import u from './utils'
import gridExtend from './modules/grid/extend'
import * as TYPE from './redux/actions/def'
import _ from 'lodash'
import React from 'react'
import ReactDom from 'react-dom'
import ReactDomServer from 'react-dom/server'
import * as Antd from 'antd'

let appInit = function (store) {

    /*通知框初始化*/
    notification.config({
        placement: 'bottomRight',
        bottom: 50,
        duration: 3,
    });

    let username = Cookies.get('username');
    let password = Cookies.get('password');

    store.dispatch(userAuth(username,password));

    u.loadSystemConfig({store,TYPE,_});

    /*jqGrid扩展初始化*/
    gridExtend();

    window.React    = React;
    window.ReactDom = ReactDom;
    window.ReactDomServer = ReactDomServer;
    window.Antd     = Antd;
}

export default appInit;