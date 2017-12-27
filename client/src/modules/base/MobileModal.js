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

        $t.regEvent('didMount',()=>{
            let container = this.props.container;
            let header = $('.ant-modal-header',container);
            let modal = $('.ant-modal',container);

            header.click(()=>{
                header.css('cursor','move');

                document.onmousemove = function (ev) {
                    let oEvent = ev || event;
                    let pos = getXY(oEvent);

                    modal.css('left', pos.x );
                    modal.css('top', pos.y );
                };
            });

            header.blur(()=>header.css('cursor','default'));

            function getXY(eve) {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
                return {x : scrollLeft + eve.clientX,y : scrollTop + eve.clientY };
            }


        })
    }

    render(){
        return (
            <Modal {...this.props}
                title           = {'1111'}
                wrapClassName   = "vertical-center-modal"
                   getContainer={()=>this.props.container}
                visible={true}
            >
                <div style={this.props.style}>
                    {this.props.component}
                </div>
            </Modal>
        )
    }
}