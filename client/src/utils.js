import _ from 'lodash'
import { notification } from 'antd';
import Cookies from 'js-cookie';
import gridExtend from './modules/grid/extend'

let u = {
    baseUrl:'/api/',
    rootLevel:1,    /*树形根层级*/
    rootId:"0",     /*树形根Id*/
    loadSuccess:false,
    _:_,
    cookies:Cookies
};

u.ajax = (options)=>{

    const NO_LOGIN          =  -1;
    const SUCCESS           =  0;
    const FAIL              =  1;
    const NO_PERMISSION     =  2;

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
            if(options.success){
                options.success(data);
            }
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

u.get   = (url,data,success)=>{
    if(_.isFunction(data)){
        u.ajax({url,type:'get',success:data});
    }else{
        url = url+'?'+$.param(data);
        u.ajax({url,type:'get',success});
    }
};
u.post  = (url,data,success)=>u.ajax({url,type:'post',data,success});
u.getDict = (type)=>{
    let d =[];

    if(u.loadSuccess){
        let {dicts} = u.sysConfig;
        dicts?dicts.forEach(v=>v.type===type?d.push(v):null):null;
    }

    return d;
};

u.getTableColumn = (tableName,columnName)=>{
    let column =null;

    if(u.loadSuccess){
        let {tableColumns} = u.sysConfig;

        for(let i=0;i<tableColumns.length;i++){
            let col = tableColumns[i];
            if(col.tableName === tableName && col.name===columnName){
                column = col;
                break;
            }
        }
    }

    return column;
};

u.tip       = (message,type)=>notification[type?type:'success']({message});
u.success   = (msg) =>u.tip(msg,'success');
u.error     = (msg) =>u.tip(msg,'error');

u.online = function(){
    if(u.loadSuccess){
        return ;
    }

    /*通知框初始化*/
    notification.config({
        placement:'bottomRight',
        bottom: 50,
        duration: 3,
    });

    /*加载系统配置*/
    let t = setInterval(()=>{
        if(!u.loadSuccess){
            u.get('api/getConfig',bean=>{
                if(bean.success()){
                    u.system   = bean.data;
                    u.loadSuccess = true;
                }
            });
        }else{
            clearInterval(t);
        }
    },100000);

    gridExtend.call(this);
};

u.outline = function(){
    u.loadSuccess = false;
    u.system   = {};
};

export default u;