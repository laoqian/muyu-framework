
let user ={};
import * as action_type from '../actions/type-def'
import Cookies from 'js-cookie';
import { notification } from 'antd';


function auth_reducer(state=user,action) {

    switch (action.type){
        case action_type.USER_AUTH:
            if(action.result.code === 0){
                state = action.result.data;

                Cookies.set('username',action.data.username);
                Cookies.set('password',action.data.password);

                notification.success({message:'认证成功'});

            }else{
                notification.error({message:action.result.data.message});
            }

            break;
        case action_type.USER_LOGOUT:
            state ={};
            notification.success({message:'退出成功'});
            break;
    }

    return state;
}


export default auth_reducer;