
import {USER_AUTH} from './def'

export function user_auth_action(username, password) {
    return {
        type: USER_AUTH,
        ajax_type: 'post',
        submit_type:'url',
        data: {username, password},
        uri: 'login'
    }
}
