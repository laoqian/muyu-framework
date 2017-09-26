
let user ={};
import * as action_type from '../actions/type-def'
import Cookies from 'js-cookie';

function auth_reducer(state=user,action) {

    switch (action.type){
        case action_type.USER_AUTH:
            if(action.result.code ===0){
                state = action.result.data;

                Cookies.set('username',action.data.username);
                Cookies.set('password',action.data.password);

                // $.jBox.tip("登陆成功");

            }else{

                new jBox('Confirm', {
                    content: 'Do you really want to do this?',
                    cancelButton: 'Nope',
                    confirmButton: 'Sure do!'
                });
                // $.jBox.tip("登陆失败,信息："+action.result.msg,'error');
            }

            break;
        case action_type.USER_LOGOUT:
            state ={};
            break;
    }

    return state;
}


export default auth_reducer;