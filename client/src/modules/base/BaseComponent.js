import {Component} from 'react'
import u from '../../utils'

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
    }
}