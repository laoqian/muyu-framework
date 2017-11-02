
import {notification}   from 'antd'

const NO_LOGIN          =  -1;
const SUCCESS           =  0;
const FAIL              =  1;
const NO_PERMISSION     =  1;

let u = {};

u.ajax = (options)=>{
    $.ajax({
        url         :  options.url,
        type        :  options.type,
        data        :  JSON.stringify(options.data),
        timeout     :  5000,
        contentType :  "application/json;charset=utf-8",
        dataType    :  "json",
        success     :  function(data) {
            let {code} = data;

            if(code !== SUCCESS){
                // notification.success({message:data.msg});
                /*请求时，收到未认证消息就退出登录*/

                if(code===NO_LOGIN){
                    store.dispatch({
                        type:def.USER_LOGOUT
                    })
                }

                notification.error({message:data.msg});
            }
            data.success = ()=>data.code===0;
            options.success(data);
        },
        error       : function(error) {
            let msg = '错误代码:'+error.status+',信息：'+error.statusText;
            notification.error({message:msg});
            let data ={code:FAIL,msg};

            data.success = ()=>data.code===0;
            if(options.success){
                options.success(data);
            }
        }
    });
};

u.get   = (url,success)=>u.ajax({url,type:'get',success});
u.post  = (url,data,success)=>u.ajax({url,type:'post',data,success});
u.getDict = (type)=>{
    let d =[];

    if(u.loadSuccess){
        let {dicts} = u.sysConfig;
        dicts?dicts.forEach(v=>v.type===type?d.push(v):null):null;
    }

    return d;
};

u.tip = (message,type)=>notification[type?type:'success']({message});

u.loadSuccess = false;

u.loadSystemConfig = (options)=>{
    u = Object.assign(u,options);

    /*加载系统配置*/
    u.get('api/getConfig',bean=>{
        if(bean.success()){
            u.sysConfig   = bean.data;
            u.loadSuccess = true;
        }
    });
}

export default u;