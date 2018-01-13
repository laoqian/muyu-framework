import React from 'react'
import {connect} from 'react-redux'
import ToolBar from '../../../layouts/toolBar'
import JqgridWrapper from '../../grid/index'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";
import colModel from './colModel'


export default class Diagram extends BaseComponent{
    constructor(){
        super();

        this.regEvent("didMount",()=>{
            let {id} = this.props.data;
            if(id){
                this.u.get(this.getBaseUrl('process/getImage?id='+id),bean=>{
                    this.setState({image:bean.data});
                })
            }
        })
    }
    render() {
        return (
            <div className="my-col-full" style={{overflow:'hidden'}}>
                <div style={{width:'100%',height:'100%'}}>
                    {this.state.image? <img src={'data:image/jpeg;base64,'+this.state.image} className="my-p-img"/>:'等待加载图片...'}
                </div>
            </div>
        )
    }
}

