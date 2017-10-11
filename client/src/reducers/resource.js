
import {USER_TYPE_GET} from '../actions/def'

let resource = immutable.Map({
    userType:{}
});

function resource_reducer(state=resource.toJS(),action) {

    switch (action.type){
        case USER_TYPE_GET:
            let userType = action.result;
            resource = resource.merge({userType});
            break;
    }

    return resource.toJS();
}


export default auth_reducer;