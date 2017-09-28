/**
 * Created by gg on 2016/1/20.
 */
import {UPDATE_TIME} from './actions/def'
import {user_auth_action} from './actions/action'
import Cookies from 'js-cookie';

function timer_init(store) {
    setInterval(() => {
        store.dispatch({
            type: UPDATE_TIME
        })
    }, 1000)
}

let app_init = function (store) {
    let username = Cookies.get('username');
    let password = Cookies.get('password');

    store.dispatch(user_auth_action(username,password));

    window.onscroll = function () {
        store.dispatch({
            type: define.PAGE_SCROLL
        })
    }
}

export default app_init;