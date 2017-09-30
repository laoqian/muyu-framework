
import {TAB_ADD,TAB_DELETE} from '../actions/def'
import immutable from 'immutable'
import _ from 'lodash'

let tabs = immutable.Map({penes: []});




function tab_reducer(state=tabs.toJS(),action) {
    let penes = tabs.toJS().penes;
    let pene = action.data;
    let __i =-1;

    switch (action.type){
        case TAB_ADD:
            __i = _.findIndex(penes,chr=>{
                return chr.key === pene.key
            });

            __i===-1?penes.push(pene):0;

            break;
        case TAB_DELETE:
            _.remove(penes,chr=>{
                return chr.key === pene.key
            });

            break;

    }

    tabs.merge(penes);
    return tabs.toJS();
}


export default tab_reducer