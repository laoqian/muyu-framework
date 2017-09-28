import {TAB_ADD,TAB_DELETE} from './def'


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