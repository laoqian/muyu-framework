import {TAB_ADD,TAB_DELETE,TAB_SEL} from './def'
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