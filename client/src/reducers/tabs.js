
import {TAB_ADD,TAB_DELETE} from '../actions/def'
import immutable from 'immutable'
import _ from 'lodash'

let tabs = immutable.Map({penes: []});


let update_node = function (pene,type) {
    let penes = tabs.toJS().penes;
    let __i =-1;

    for(let i in penes){
        if(penes[i].key === pene.key){
            __i = i;
            break;
        }
    }

    switch (type){
        case TAB_ADD:
            if(__i === -1 ){
                penes.push(pene);
            }

            break;
        case TAB_DELETE:

            if(__i !== -1){
                penes.delete(__i);
            }
            break;
    }

    tabs.merge(penes);
    return tabs.toJS();
}

function tab_reducer(state=tabs.toJS(),action) {
    state = update_node(action.data,action.type);
    return state;
}


export default tab_reducer