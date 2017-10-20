import {UPDATE_TIME} from './redux/actions/def'
import {userAuth} from './redux/actions/user'
import Cookies from 'js-cookie';
import { notification } from 'antd';

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

}

export default appInit;