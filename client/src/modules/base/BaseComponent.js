import {Component} from 'react'
import u from '../../utils'
import _ from 'lodash'
import Modal from './Modal'

export default class BaseComponent extends Component{

    constructor(props){
        super(props);
        let $t              =   this;
        $t.u                =   u;
        $t.baseUrl          =   '/api/';
        $t.getBaseUrl       =   (url)=>$t.baseUrl+url;
        $t.getUrl           =   (url)=>'/api'+url;
        $t.getFileUrl       =   (url)=>'/files'+url;
        $t.state            =   {componentType:'自定义组件'};
        $t.eventFunc        =   {};
        $t.getWithTip       =   (url,data,cb)=>$t.u.getWithTip($t.getBaseUrl(url),data,cb);
        $t.postWithTip      =   (url,data,cb)=>$t.u.postWithTip($t.getBaseUrl(url),data,cb);

        $t.extend = function(){
            for(let i=0;i<arguments.length;i++){
                let func = require('./'+arguments[i]).default;
                if(func){
                    func.call($t);
                }
            }
        };

        $t.componentCheck = ()=>{
            if($t.state.componentType!=='自定义组件'){
                throw new Error("非自定义组件，不能绑定相关方法");
            }
        };

        $t.regEvent = (event,func) => {
            let beforeFunc = $t.eventFunc[event];
            $t.eventFunc[event] = _.isFunction(beforeFunc)?()=>{beforeFunc();func();}:func;
        };

        $t.dialog =(name,hander,getId)=>$t.regDialog({name,hander,getId});
        $t.regDialog  = (options)=>$t.eventFunc[options.name] = ()=>$t.openDialog(options);
        $t.openDialog = async (options)=>{
            let {props,hander,getId} = options;
            props = props|| {};

            if(!getId){
                getId = $t.getId;
            }

            if(getId){
                let id = _.isFunction(getId)?getId():getId;
                if(id){
                    let bean = await $t.getData(id);
                    props.row = bean.data;
                }
            }

            if(_.isFunction(hander)){
                props.data = await hander(props.row);
            }

            if(options.reactNode){
                props.afterOk     = options.afterOk;
                Modal.open(options.reactNode,props);
            }
        };

        $t.eventFunc.callFunc = (name,args)=>{
            let func = $t.eventFunc[name];
            if(_.isFunction(func)){
                _.isObject(args)?func(args.props,args.state):func();
            }
        };

        $t.getData = id => {
            return new Promise((res, rej) => {
                u.get($t.getBaseUrl('get?id=' + id), function (bean) {
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
            $t.eventFunc.callFunc('receiveProps',{props:nextProps});
        };

        $t.componentWillUpdate = (nextProps,nextState) => {
            $t.eventFunc.callFunc('willUpdate',{props:nextProps,state:nextState});
        };

        $t.componentDidUpdate = (prevProps,prevState) => {
            $t.eventFunc.callFunc('didUpdate',{props:prevProps,state:prevState});
        };

        $t.componentWillUnmount = (nextProps,nextState) => {
            $t.eventFunc.callFunc('willUnmount',{props:nextProps,state:nextState});
        };
    }
}