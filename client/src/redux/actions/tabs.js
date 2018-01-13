import {TAB_ADD,TAB_DELETE,TAB_SEL} from './def'
import store from '../store/configure'

let id = 1;


export function tabAdd(data) {
    if(!data.id){
        data.id = (id++).toString();
    }

    return {
        type:TAB_ADD,
        data
    }
}

export function tabDelete(data) {
    return {
        type:TAB_DELETE,
        data,
    }
}

export function tabSel(data) {
    return {
        type:TAB_SEL,
        data,
    }
}

const tab = {
    add     :data=>store.dispatch(tabAdd(data))     ,
    delete  :data=>store.dispatch(tabDelete(data))  ,
    active  :data=>store.dispatch(tabSel(data))
};

export default tab;