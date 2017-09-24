
let user ={};
import * as action_type from '../actions/type-def'

function auth_reducer(state=user,action) {

    switch (action.type){
        case action_type.USER_AUTH:
            if(action.result.code ===0){
                state = action.result.data;
                $.jBox.tip("登陆成功");

            }else{
                $.jBox.tip("登陆失败",'error');
            }

            break;
        case action_type.USER_LOGOUT:
            state ={};
            break;
    }

    return state;
}


export default auth_reducer;