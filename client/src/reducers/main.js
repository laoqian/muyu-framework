import auth_reducer from './user'
import menu_reducer from './menu'
import tab_reducer from './tabs'

let reducers = {
    user:auth_reducer,
    tabs:tab_reducer,
    menu:menu_reducer
};

export default reducers;
