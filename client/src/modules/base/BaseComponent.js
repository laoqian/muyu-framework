import {Component} from 'react'
import u from '../../utils'
import _ from 'lodash'

export default class BaseComponent extends Component{

    constructor(props){
        super(props);
        this.u = u;
        this.baseUrl ='/api/';
        this.encodeUrl = (url)=>this.baseUrl+url;
        this.state = {};
        this.extend = function(){
            for(let i=0;i<arguments.length;i++){
                let func = require('./'+arguments[i]).default;
                if(func){
                    func.call(this);
                }
            }
        };

        this.eventFunc = {};
        this.state.componentType ='自定义组件';
        this.componentCheck = ()=>{
            if(this.state.componentType!=='自定义组件'){
                throw new Error("自定义组件，不能绑定相关方法");
            }
        };
        this.regEvent = (cnName,enName, func) => {
            let fun;

            if(_.isFunction(enName)){
                fun = enName;
            }else{
                fun = this[enName] = func;
            }

            if(_.isFunction(this.eventFunc[cnName])){
                let beforeFunc = this.eventFunc[cnName];
                this.eventFunc[cnName] = ()=>{
                    beforeFunc();
                    fun();
                }
            }else{
                this.eventFunc[cnName] = fun;
            }
        };

        this.eventFunc.callFunc = (name,args)=>{
            let func = this.eventFunc[name];
            if(_.isFunction(func)){
                _.isObject(args)?func(...args):func();
            }
        };

        this.componentWillMount = ()=>{
            this.eventFunc.callFunc('willMount');
        };

        this.componentDidMount = ()=>{
            this.eventFunc.callFunc('didMount');
        };

        this.componentWillReceiveProps=(nextProps)=>{
            this.eventFunc.callFunc('receiveProps',{nextProps});
        };

        this.componentWillUpdate = (nextProps,nextState) => {
            this.eventFunc.callFunc('willUpdate',{nextProps,nextState});
        };

        this.componentDidUpdate = (nextProps,nextState) => {
            this.eventFunc.callFunc('didUpdate',{nextProps,nextState});
        };
    }

}