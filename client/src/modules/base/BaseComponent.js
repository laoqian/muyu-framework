import {Component} from 'react'
import u from '../../utils'

export default class BaseComponent extends Component{

    constructor(props){
        super(props);
        this.u = u;
        this.baseUrl ='/api/';
        this.encodeUrl = (url)=>this.baseUrl+url;
    }
}