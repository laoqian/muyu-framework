import u        from '../../utils'

//异步ajax中间件
const fetchMiddleware = store => next => action => {

    if (action.ajax_type === undefined) {
        return next(action);
    }

    let url = u.baseUrl + '/' + action.uri;
    let data ='';

    if(action.submit_type ==='url'){
        if(action.data){
            url = url+'?'+$.param(action.data);
        }

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
            next(action);
        }
    });
}

export default fetchMiddleware;
