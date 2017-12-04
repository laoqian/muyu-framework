import React from 'react'
import ReactDOM from 'react-dom'
import { Spin } from 'antd';
import BaseComponent from './BaseComponent'

let container = null;

export default class Loading extends BaseComponent{
    static show(text){
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Loading text={text} />, container);
    }

    static hide(){
        if(container){
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
            container = null;
        }
    }

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="my-loading-wrapper" >
                <div className="my-loading">
                    <Spin size="large" />
                    <span >{this.props.text}</span>
                </div>
            </div>
        )
    }
}

