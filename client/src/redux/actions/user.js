
import {USER_AUTH} from './def'

export function userAuth(username, password) {
    return {
        type: USER_AUTH,
        ajax_type: 'post',
        submit_type:'url',
        data: {username, password},
        uri: 'login'
    }
}

export function userGet(id) {
    return {
        type: USER_AUTH,
        ajax_type: 'post',
        submit_type:'url',
        data: {id},
        uri: 'user/get'
    }
}