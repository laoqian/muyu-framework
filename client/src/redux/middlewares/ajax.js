import config   from '../../config.js'
import u        from '../../utils'

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

    u.ajax({
        url,
        data,
        type:action.ajax_type,
        success:function (data){
            action.result = data;
            console.log(`ajax result:`,action);
            data.code===0?next(action):null;
        }
    });
}

export default fetchMiddleware;
