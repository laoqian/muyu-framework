import _ from 'lodash'
import { notification } from 'antd';
import Cookies from 'js-cookie';
import gridExtend from './modules/grid/extend'
import React from 'react'
import fetch from 'isomorphic-fetch'


let u = {
    baseUrl:'/api/',
    rootLevel:1,    /*树形根层级*/
    rootId:"0",     /*树形根Id*/
    loadSuccess:false,
    _:_,
    cookies:Cookies
};

u.ajax = (options)=>{

    const NO_LOGIN          = -1;
    const SUCCESS           =  0;
    const FAIL              =  1;
    const NO_PERMISSION     =  2;
    let data = options.data;
    let url;
    if(options.type==='post'&& data && data.id){
        url = options.url+"?id="+data.id;
    }else{
        url = options.url;
    }

    $.ajax({
        url         :  url,
        type        :  options.type,
        data        :  JSON.stringify(options.data),
        contentType : "application/json; charset=utf-8",
        timeout     :  30000,
        dataType    :  "json",
        success     :  function(data){
            let {code} = data;
            if(code !== SUCCESS){
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
            let msg = '错误代码:'+error.status+',信息：'+ error.statusText;
            notification.error({message:msg});
            let data ={code:FAIL,msg};

            data.success = ()=>data.code===0;
            if(options.success){
                options.success(data);
            }
        }
    });
};

u.authVarify = code=>{
    const NO_LOGIN          = -1;
    if(code===-1){
        store.dispatch({
            type:def.USER_LOGOUT
        })
    }

    return code!==-1;
}

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
        let {dicts} = u.system;
        dicts?dicts.forEach(v=>v.type===type?d.push(v):null):null;
    }

    return d;
};

u.getMenuList =()=>u.loadSuccess?u.system.menuList:null;
u.getMenuTree =()=>u.loadSuccess?u.system.menuTree:null;
u.getRoleList =()=>u.loadSuccess?u.system.roleList:null;

u.getTableColumn = (tableName,columnName)=>{
    let column =null;

    if(u.loadSuccess){
        let {tableColumns} = u.system;

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

u.configuration = ()=>{
    u.get('api/getConfig',bean=>{
        if(bean.success()){
            u.system   = bean.data;
            u.loadSuccess = true;
            console.log(`请求系统配置完成`,bean);
        }
    });
};

u.online = function(){
    if(u.loadSuccess){
        return;
    }

    /*加载系统配置*/
    let  i = 1 ;
    console.log(`第${i++}次请求系统配置`);
    u.configuration();
    let t = setInterval(function(){
        if(!u.loadSuccess){
            console.log(`第${i++}次请求系统配置`);
            u.configuration();
        }else{
            clearInterval(t);
        }
    },5000);

    gridExtend.call(this);
};

u.outline = function(){
    u.loadSuccess = false;
    u.system   = {};
};


u.randId= (()=>{
    let id =0;
    return ()=>('uid'+id++);
})();

export default u;