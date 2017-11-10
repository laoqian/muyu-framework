
import {USER_AUTH,USER_LOGOUT} from './def'

export function userAuth(username, password) {
    return {
        type: USER_AUTH,
        ajax_type: 'post',
        submit_type:'url',
        data: {username, password},
        uri: 'login'
    }
}

export function userLogout() {
    return {
        type: USER_LOGOUT,
        ajax_type: 'get',
        submit_type:'url',
        uri: 'logout'
    }
}
