/*
*
*
*
*
**/

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducer.js';
import config from '../config.js';


const rootReducer = combineReducers(reducers);


//异步ajax中间件
const fetchMiddleware = store => next => action => {

    if (action.ajax_type === undefined) {
        return next(action);
    }

    let url = config.base_url + '/' + action.uri;

    url = url+'?'+$.param(action.data);
    $.ajax({
        url,
        data:action.data,
        dataType:'json',
        type:action.ajax_type,
        timeout:2000,
        error:function (error) {
            console.log(error);
        },
        success:function (data) {
            action.data = data;

            console.log(action);
            next(action);
        }
    });
}



if (__DEV__) {
    var DevTools = require('../components/DevTools')
    var createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        applyMiddleware(fetchMiddleware),
        DevTools.instrument()
    )(createStore);

} else {
    var createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        applyMiddleware(fetchMiddleware)
    )(createStore);
}


export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        store.replaceReducer(rootReducer)
    }

    return store;
}