import {Component} from 'react'
import u from '../../utils'
import _ from 'lodash'

export default class BaseComponent extends Component{

    constructor(props){
        super(props);
        let $t = this;
        $t.u = u;
        $t.baseUrl ='/api/';
        $t.encodeUrl = (url)=>$t.baseUrl+url;
        $t.state = {};
        $t.extend = function(){
            for(let i=0;i<arguments.length;i++){
                let func = require('./'+arguments[i]).default;
                if(func){
                    func.call($t);
                }
            }
        };

        $t.eventFunc = {};
        $t.state.componentType ='自定义组件';
        $t.componentCheck = ()=>{
            if($t.state.componentType!=='自定义组件'){
                throw new Error("自定义组件，不能绑定相关方法");
            }
        };

        $t.openDialog = (url,type,promise)=>$t.editRow(null,url,type,promise);
        $t.regDialog =(url,type,promise)=>{
            $t.eventFunc[type] = ()=>$t.openDialog(url,type,promise);
        };

        $t.regEvent = (cnName,enName,func) => {
            let fun;

            if(_.isFunction(enName)){
                fun = enName;
            }else{
                fun = $t[enName] = func;
            }

            if(_.isFunction($t.eventFunc[cnName])){
                let beforeFunc = $t.eventFunc[cnName];
                $t.eventFunc[cnName] = ()=>{
                    beforeFunc();
                    fun();
                }
            }else{
                $t.eventFunc[cnName] = fun;
            }
        };

        $t.eventFunc['修改'] = $t.editRow = async (id,url,type,promise) => {
            let row,data;
            if (!id) {
                row = $t.getSelRowData();
            } else {
                row = $t.getGrid().getRowData(id);
            }

            id =row? row.id:null;

            if (!id) {
                return u.tip('未选中列', 'error');
            } else {
                try {
                    type= type?type:'编辑';
                    let bean = await $t.loadSelData(id);
                    row = bean.data;
                    u.success(type+'：' + row.id);
                    if(promise){
                        data = await promise(row);
                    }
                } catch (err) {
                    return u.error(err);
                }
            }

            $t.history.push({pathname: url?url:'/edit', type, row, grid: $t.getGrid(),data});
        };

        $t.eventFunc.callFunc = (name,args)=>{
            let func = $t.eventFunc[name];
            if(_.isFunction(func)){
                _.isObject(args)?func(...args):func();
            }
        };

        $t.loadSelData = (id) => {
            return new Promise((res, rej) => {
                u.get($t.encodeUrl('get?id=' + id), function (bean) {
                    if (bean.code === 0 && bean.data) {
                        res(bean);
                    } else {
                        rej(bean);
                    }
                });
            })
        };

        $t.componentWillMount = ()=>{
            $t.eventFunc.callFunc('willMount');
        };

        $t.componentDidMount = ()=>{
            $t.eventFunc.callFunc('didMount');
        };

        $t.componentWillReceiveProps=(nextProps)=>{
            $t.eventFunc.callFunc('receiveProps',{nextProps});
        };

        $t.componentWillUpdate = (nextProps,nextState) => {
            $t.eventFunc.callFunc('willUpdate',{nextProps,nextState});
        };

        $t.componentDidUpdate = (nextProps,nextState) => {
            $t.eventFunc.callFunc('didUpdate',{nextProps,nextState});
        };
    }

}