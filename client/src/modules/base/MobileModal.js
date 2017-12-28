import {Modal} from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from './BaseComponent'


export default class MobileModal extends BaseComponent{

    static open(component,props){
        let div = document.createElement('div'),container=document.createElement('div');
        document.body.appendChild(div);
        document.body.appendChild(container);
        $(container).addClass('mobile-modal');
        ReactDOM.render(<MobileModal container={container} {...props} component={component}/>,div);
        return container;
    }

    constructor(){
        super();
        let $t = this;
        let u = this.u;

        $t.regEvent('didMount',()=>{
            u.moveable($('.ant-modal',this.props.container),$('.ant-modal-header',this.props.container));
        })
    }

    render(){
        return (
            <Modal {...this.props}
                title           = {'1111'}
                wrapClassName   = "vertical-center-modal"
                getContainer    = {()=>this.props.container}
                visible={true}
            >
                <div style={this.props.style}>
                    {this.props.component}
                </div>
            </Modal>
        )
    }
}