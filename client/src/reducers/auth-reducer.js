
let user ={};
import * as action_type from '../action_type'

function auth_reducer(state=user,action) {

    switch (action.type){
        case action_type.USER_AUTH:
            if(action.result.code ===0){
                state = action.result.data;
            }
            break;
        case action_type.USER_LOGOUT:
            state ={};
            break;
    }

    console.log(state);
    return state;
}


export default auth_reducer;