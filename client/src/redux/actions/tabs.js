import {TAB_ADD,TAB_DELETE,TAB_SEL} from './def'


export function tab_add(data) {
    return {
        type:TAB_ADD,
        data
    }
}

export function tab_delete(data) {
    return {
        type:TAB_DELETE,
        data,
    }
}

export function tab_sel(data) {
    return {
        type:TAB_SEL,
        data,
    }
}