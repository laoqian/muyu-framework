
import {USER_AUTH,USER_LOGOUT,USER_ADD,USER_DELETE} from '../actions/def'
import Cookies from 'js-cookie';
import { notification } from 'antd';
import immutable from 'immutable'

let user = immutable.Map({authed: {}, data: {}});

function auth_reducer(state = user.toJS(),action) {

    switch (action.type){
        case USER_AUTH:
            if(action.result.code === 0){
                user = user.merge({authed:action.result.data});
                state = user.toJS();

                Cookies.set('username',action.data.username);
                Cookies.set('password',action.data.password);

                notification.success({message:'认证成功'});
            }else{
                notification.error({message:action.result.msg});
            }

            break;
        case USER_LOGOUT:
            user = user.merge({authed: {}});
            state = user.toJS();
            notification.success({message:'退出成功'});
            break;
        case USER_ADD:
            break;
        case USER_DELETE:
            break;
    }

    return state;
}


export default auth_reducer;