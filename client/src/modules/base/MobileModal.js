import {Modal,Button} from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from './BaseComponent'


export default class MobileModal extends BaseComponent{

    static open(component,props){
        let div = document.createElement('div'),container=document.createElement('div');
        document.body.appendChild(div);
        document.body.appendChild(container);
        $(container).addClass('my-mobile-modal');
        ReactDOM.render(<MobileModal container={container} {...props} component={component}/>,div);
        return container;
    }

    constructor(){
        super();

        this.regEvent('didMount',()=>{
            this.u.moveable($('.ant-modal',this.props.container),$('.ant-modal-header',this.props.container));
        });

        this.zoomNormal = ()=>{
            console.log('zoomNormal');
            this.setState({modalClass:null});
        };

        this.zoomMax = ()=>{
            console.log('zoomMax');
            this.setState({modalClass:'my-full-screen'});
        }
    }

    render(){
        return (
            <Modal {...this.props}
                className       ={this.state.modalClass}
                title           = {<TiTle parent= {this} title={this.props.title}/>}
                closable        = {false}
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

class TiTle extends BaseComponent{
    constructor(){
        super();

        this.zoomMax =()=>this.props.parent.zoomMax();
        this.zoomNormal =()=>this.props.parent.zoomNormal();
    }

    render(){
        return(
            <div className='my-modal-title'>
                <span>
                    {this.props.title}
                </span>
                <div>
                    <Button icon="minus"  onClick={this.zoomNormal}/>
                    <Button icon="folder" onClick={this.zoomMax}/>
                    <Button icon="close"/>
                </div>
            </div>
        )
    }
}