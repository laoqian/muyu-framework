import {Modal,Button} from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from './BaseComponent'


export default class MyModal extends BaseComponent{

    static open(children,props){
        let div = document.createElement('div');
        document.body.appendChild(div);
        return  ReactDOM.render(<MyModal {...props} children={children}/>,div);
    }

    constructor(){
        super();

        this.container = document.createElement('div');
        this.container.setAttribute('class','my-mobile-modal');
        document.body.appendChild(this.container);

        this.regEvent('didMount',()=>{
           this.modalCtrl = this.u.moveable($('.ant-modal',this.container),$('.ant-modal-header',this.container));
        });

        this.zoom = (max)=>{
            this.setState({modalClass:max?'my-full-screen':null});
            max?this.modalCtrl.move=false:null;
        };

        this.close = () =>{
            document.body.removeChild(this.container);
        };

        this.ok = async ()=>{
            this.setState({loading:true});

            try {
                await this.props.children.ok();
            }catch (e){
                this.u.error(e);
            }

            this.setState({loading:false});
        }
    }

    render(){
        return (
            <Modal {...this.props}
                    className       = {this.state.modalClass}
                    title           = {<TiTle parent= {this} title={this.props.title}/>}
                    closable        = {false}
                    wrapClassName   = "vertical-center-modal"
                    getContainer    = {() => this.container}
                    onOk            = {() => this.ok()}
                    onCancel        = {() => this.close()}
                    visible         = {true}
                    confirmLoading  = {this.state.loading}
            >
                <div style={this.props.style}>
                    {this.props.children}
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