
import {MENU_GET_LIST,MENU_GET,MENU_ADD,MENU_DELETE} from '../actions/def'
import immutable from 'immutable'

let menu = immutable.Map({list: [], data: {}});

function menu_reducer(state=menu.toJS(),action) {

    switch (action.type){
        case MENU_GET_LIST:
            menu = menu.merge({list:action.result.data})
            state  =menu.toJS();
            break;
        case MENU_GET:
            break;
        case MENU_ADD:
            break;
        case MENU_DELETE:
            break;
        default:

    }

    return state;
}


export default menu_reducer;