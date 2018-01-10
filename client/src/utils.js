import _ from 'lodash'
import { notification } from 'antd';
import Cookies from 'js-cookie';
import React from 'react'
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
};

u.get   = (url,data,success)=>{
    if(_.isFunction(data)){
        u.ajax({url,type:'get',success:data});
    }else{
        url = url+'?'+$.param(data);
        u.ajax({url,type:'get',success});
    }
};

u.getWithTip=(url,data,success)=>{
    let cb = (bean)=>{
        if(bean.success()){
            u.success(bean.msg);
        }

        if(_.isFunction(data)){
            data(bean);
        }else if(_.isFunction(success)){
            success(bean);
        }
    };

    _.isFunction(data)||!data ? u.get(url,cb):u.get(url,data,cb);
};

u.postWithTip=(url,data,success)=>{
    let cb = (bean)=>{
        if(bean.success()){
            u.success(bean.msg);
        }

        if(_.isFunction(success)){
            success(bean);
        }
    };

    u.post(url,data,cb);
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

u.configuration = (cb)=>{
    u.get('api/getConfig',bean=>{
        if(bean.success()){
            u.system   = bean.data;
            u.loadSuccess = true;
            cb();
        }
    });
};



u.online = function(cb){
    if(u.loadSuccess){
        return;
    }

    u.configuration(cb);
    let t = setInterval(function(){
        if(!u.loadSuccess){
            u.configuration(cb);
        }else{
            clearInterval(t);
        }
    },5000);
};

u.outline = function(){
    u.loadSuccess = false;
    u.system   = {};
};


u.randId= (()=>{
    let id =0;
    return ()=>('uid'+id++);
})();

u.moveable = (m,h)=>{
    let header=  $(h),modal = $(m);
    let ctrl ={move:false,offsetX:0,offsetY:0};

    header.mousedown(function(e) {
        ctrl.move = true;
        ctrl.offsetX = e.clientX-getLeft(e.target);
        ctrl.offsetY = e.clientY-getTop(e.target);
    });

    header.mouseup(function(e) {
        ctrl.move = false;
    });

    function getTop(e){
        let offset= e.offsetTop;
        if(e.offsetParent!==null) offset+=getTop(e.offsetParent);
        return offset;
    }

    function getLeft(e){
        let offset=e.offsetLeft;
        if(e.offsetParent!==null) offset+=getLeft(e.offsetParent);
        return offset;
    }

    $(document).mousemove(function (event) {
        if(ctrl.move){
            let  x =  event.clientX;
            let  y =  event.clientY;

            modal.css('left', x-ctrl.offsetX);
            modal.css('top', y-ctrl.offsetY);
            modal.css('position', 'absolute');
        }
    });

    return ctrl;
};


export default u;