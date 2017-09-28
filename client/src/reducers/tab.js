
import {TAB_ADD,TAB_DELETE} from '../actions/def'
import immutable from 'immutable'

let tabs = immutable.Map({penes: []});

function tab_reducer(state=tabs.toJS(),action) {

    switch (action.type){
        case TAB_ADD:
            let penes = state.penes;
            penes.push(action.data);
            tabs.merge({penes});
            state = tabs.toJS();
            break;
        case TAB_DELETE:
            break;
        default:
    }

    return state;
}


export default tab_reducer