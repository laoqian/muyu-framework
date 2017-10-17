import {TAB_ADD,TAB_DELETE,TAB_SEL} from './def'


export function tabAdd(data) {
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