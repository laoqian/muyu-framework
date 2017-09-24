import config from '../config.js';


//异步ajax中间件
const fetchMiddleware = store => next => action => {

    if (action.ajax_type === undefined) {
        return next(action);
    }

    let url = config.base_url + '/' + action.uri;
    let data ='';

    if(action.submit_type ==='url'){
        url = url+'?'+$.param(action.data);
    }else{
        data = action.data;
    }

    $.ajax({
        url,
        data,
        dataType:'json',
        type:action.ajax_type,
        timeout:2000,
        error:function (error) {
            console.log(error);
        },
        success:function (data) {
            action.result = data;

            console.log(action);
            next(action);
        }
    });
}

export default fetchMiddleware;
