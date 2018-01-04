import {Component} from 'react'
import u from '../../utils'
import _ from 'lodash'
import Modal from './Modal'

export default class BaseComponent extends Component{

    constructor(props){
        super(props);
        let $t           = this;
        $t.u             = u;
        $t.baseUrl       ='/api/';
        $t.encodeUrl     = (url)=>$t.baseUrl+url;
        $t.encodeBaseUrl = (url)=>'/api'+url;
        $t.encodeFileUrl = (url)=>'/files'+url;
        $t.state         = {};
        $t.eventFunc     =   {};
        $t.extend = function(){
            for(let i=0;i<arguments.length;i++){
                let func = require('./'+arguments[i]).default;
                if(func){
                    func.call($t);
                }
            }
        };

        $t.state.componentType  =   '自定义组件';
        $t.componentCheck = ()=>{
            if($t.state.componentType!=='自定义组件'){
                throw new Error("自定义组件，不能绑定相关方法");
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
            if(getId){
                let bean = await $t.getData(_.isFunction(getId)?getId():getId);
                props.row = bean.data;
            }

            if(_.isFunction(hander)){
                props.data = await hander(props.row);
            }

            if(options.reactNode){
                props.afterOk     = options.afterOk;
                props.afterCancel = options.afterCancel;
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