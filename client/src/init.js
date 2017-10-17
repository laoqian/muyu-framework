import {UPDATE_TIME} from './actions/def'
import {userAuth} from './actions/user'
import Cookies from 'js-cookie';
import { notification } from 'antd';

function timerInid(store) {
    setInterval(() => {
        store.dispatch({
            type: UPDATE_TIME
        })
    }, 1000)
}

let app_init = function (store) {

    /*通知框初始化*/
    notification.config({
        placement: 'bottomRight',
        bottom: 50,
        duration: 3,
    });

    let username = Cookies.get('username');
    let password = Cookies.get('password');

    store.dispatch(userAuth(username,password));

    window.onscroll = function () {
        store.dispatch({
            type: define.PAGE_SCROLL
        })
    }
}

export default app_init;