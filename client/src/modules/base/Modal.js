import {Modal,Button,Switch} from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from './BaseComponent'


export default class MyModal extends BaseComponent{

    static open(children,props){
        let div = document.createElement('div');
        document.body.appendChild(div);
        return  ReactDOM.render(<MyModal {...props} rootDiv={div} children={children}/>,div);
    }

    constructor(){
        super();

        this.container = document.createElement('div');
        this.container.setAttribute('class','my-mobile-modal');
        document.body.appendChild(this.container);

        this.regEvent('willMount',()=>{
            let props =this.props.childProps || {};
            props.setOkHander = (ok)=>this.okHander=ok;
            this.childrenWithProps = React.cloneElement(this.props.children,props)
        });

        this.regEvent('didMount',()=>{
            this.modalCtrl = this.u.moveable($('.ant-modal',this.container),$('.ant-modal-header',this.container));
        });

        this.zoom = (max)=>{
            this.setState({modalClass:max?'my-full-screen':null});
            max?this.modalCtrl.move=false:null;
        };

        this.close = () =>{
            document.body.removeChild(this.props.rootDiv);
            document.body.removeChild(this.container);
        };

        this.ok = async (colse)=>{
            this.setState({loading:true});

            try {
                await this.okHander();
            }catch (e){
                this.u.error(e);
            }

            this.setState({loading:false});
            console.log(colse);
            if(colse){
                this.close();
            }
        };
    }

    render(){
        return (
            <Modal {...this.props}
                    className       = {this.state.modalClass}
                    title           = {<TiTle parent= {this} title={this.props.title}/>}
                    footer          = {<Footer parent= {this}/>}
                    closable        = {false}
                    wrapClassName   = "vertical-center-modal"
                    getContainer    = {() => this.container}
                    onOk            = {() => this.ok()}
                    onCancel        = {() => this.close()}
                    visible         = {true}
                    confirmLoading  = {this.state.loading}
            >
                <div style={this.props.style}>
                    {this.childrenWithProps}
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
        let icon = this.state.zoomMax?'minus':'folder';
        return(
            <div className='my-modal-title' onDoubleClick={()=>this.zoom(!this.state.zoomMax)}>
                <span>
                    {this.props.title}
                </span>
                <div>
                    <Button icon={icon} onClick={()=>this.zoom(!this.state.zoomMax)}/>
                    <Button icon="close" onClick={()=>this.props.parent.close()}/>
                </div>
            </div>
        )
    }
}

class Footer extends BaseComponent{
    constructor(){
        super();
        this.state.checked=true;
   }

    render(){
        let icon = this.props.loading?"loading":null;
        return(
            <div className='my-modal-footer' onDoubleClick={()=>this.zoom(!this.state.zoomMax)}>
                <div>
                    <Switch size="small" defaultChecked onChange={(checked)=>this.setState({checked})}/>
                    &nbsp;确认并关闭
                </div>
                <div>
                    <Button  type="default" onClick={()=>this.props.parent.close()}>取消 </Button>
                    <Button icon={icon} type="primary" onClick={()=>this.props.parent.ok(this.state.checked)}>确定</Button>
                </div>
            </div>
        )
    }
}