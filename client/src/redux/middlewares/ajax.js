import config from '../../config.js';
import { message } from 'antd';

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

    console.log(`${action.ajax_type}--->:`,action);

    $.ajax({
        url,
        data,
        dataType:'json',
        type:action.ajax_type,
        timeout:2000,
        error:function (error) {
            let errorText = '错误代码:'+error.status+',信息：'+error.statusText;
            message.error(errorText);
        },
        success:function (data) {
            action.result = data;

            console.log(`ajax result:`,action);
            next(action);
        }
    });
}

export default fetchMiddleware;
