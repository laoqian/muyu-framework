
import {USER_AUTH,USER_LOGOUT} from '../actions/def'
import Cookies from 'js-cookie';
import { notification } from 'antd';
import immutable from 'immutable'

let user = immutable.Map({});

function auth_reducer(state = user.toJS(),action) {

    switch (action.type){
        case USER_AUTH:
            if(action.result.code === 0){
                user = user.merge(action.result.data);
                state = user.toJS();

                Cookies.set('username',action.data.username);
                Cookies.set('password',action.data.password);

            }else{
                if(action.result.data){
                    user = user.merge(action.result.data);
                    state = user.toJS();
                }
            }
            break;
        case USER_LOGOUT:
            user = immutable.Map({});
            state = user.toJS();
            notification.success({message:'退出成功'});
            break;
    }
    console.log(state);
    return state;
}


export default auth_reducer;