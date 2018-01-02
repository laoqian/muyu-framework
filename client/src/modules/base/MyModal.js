import {Modal,Button} from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from './BaseComponent'


export default class MyModal extends BaseComponent{

    static open(component,props){
        let div = document.createElement('div'),container=document.createElement('div');
        document.body.appendChild(div);
        document.body.appendChild(container);
        $(container).addClass('my-mobile-modal');
        ReactDOM.render(<MyModal container={container} {...props} component={component}/>,div);
        return container;
    }

    constructor(){
        super();

        this.regEvent('didMount',()=>{
            this.u.moveable($('.ant-modal',this.props.container),$('.ant-modal-header',this.props.container));
        });

        this.zoom = (max)=>{
            if(max){
                this.setState({modalClass:'my-full-screen'});
            }else{
                this.setState({modalClass:null});
            }
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
                visible         = {true}
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
        this.state.zoomMax = false;

        this.zoom = max=>{
            this.setState({zoomMax:max});
            this.props.parent.zoom(max);
        }
    }

    render(){
        return(
            <div className='my-modal-title'>
                <span>
                    {this.props.title}
                </span>
                <div>
                    {
                        this.state.zoomMax?<Button icon="minus" onClick={()=>this.zoom(false)}/>:<Button icon="folder" onClick={()=>this.zoom(true)}/>
                    }
                    <Button icon="close" onClick={()=>this.props.parent.close()}/>
                </div>
            </div>
        )
    }
}