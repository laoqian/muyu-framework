
import {MENU_GET_LIST,MENU_ADD,MENU_DELETE} from './def'

export function get_user_menu_list() {
    return {
        type:MENU_GET_LIST,
        uri :'menu/findList',
        ajax_type:'get'
    }
}


export function menu_add(menu) {
    return {
        type:MENU_ADD,
        uri :'menu/save',
        data:menu,
        ajax_type:'post'
    }
}


export function menu_delete(menu) {
    return {
        type:MENU_DELETE,
        uri :'menu/delete',
        data:menu,
        ajax_type:'post'
    }
}