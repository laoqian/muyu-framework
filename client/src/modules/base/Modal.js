import {Modal,Button,Switch} from 'antd'
import React ,{Component}from 'react'
import ReactDOM from 'react-dom'
import u from '../../utils'


export default class MyModal extends Component{

    static open(children,props){
        let div = document.createElement('div');
        document.body.appendChild(div);
        return  ReactDOM.render(<MyModal {...props} rootDiv={div} children={children}/>,div);
    }

    static confirm(text,props){
        return MyModal.open(text,Object.assign(props||{},{hideConfirmBtn:true,hideZoomBtn:true}));
    }

    constructor(){
        super();
        this.state = {};
        this.container = document.createElement('div');
        this.container.setAttribute('class','my-mobile-modal');
        document.body.appendChild(this.container);

        this.componentWillMount = ()=>{
            let {children} = this.props;
            if(_.isString(children)){
                this.childrenWithProps = children;
                this.okHander = this.props.okHander;
            }else{
                this.childrenWithProps = React.cloneElement(children,{setOkHander:(ok)=>this.okHander=ok})
            }
        };

        this.componentDidMount = ()=>{
            this.modalCtrl = u.moveable($('.ant-modal',this.container),$('.ant-modal-header',this.container));
        };

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
                let {afterOk} = this.props;
                if(_.isFunction(afterOk)){
                    afterOk();
                }
            }catch (e){
                throw e;
            }

            if(colse){
                this.close();
            }else{
                this.setState({loading:false});
            }
        };
    }

    render(){
        return (
            <Modal {...this.props}
                    className       = {this.state.modalClass}
                    title           = {<TiTle parent= {this} title={this.props.title} hideZoomBtn={this.props.hideZoomBtn} />}
                    footer          = {<Footer parent= {this} hideConfirmBtn={this.props.hideConfirmBtn} />}
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


class TiTle extends Component{
    constructor(){
        super();
        this.state={zoomMax:false};

        this.zoom = max=>{
            this.setState({zoomMax:max});
            this.props.parent.zoom(max);
        }
    }

    render(){
        let icon = this.state.zoomMax?'minus':'folder';
        let zoomBtn = <Button icon={icon} onClick={()=>this.zoom(!this.state.zoomMax)}/>;
        return(
            <div className='my-modal-title' onDoubleClick={()=>this.zoom(!this.state.zoomMax)}>
                <span>
                    {this.props.title}
                </span>
                <div>
                    {this.props.hideZoomBtn?null:zoomBtn}
                    <Button icon="close" onClick={()=>this.props.parent.close()}/>
                </div>
            </div>
        )
    }
}

class Footer extends Component{
    constructor(){
        super();
        this.state = {checked:true};
   }

    render(){
        let icon = this.props.loading?"loading":null;

        return(
            <div className='my-modal-footer' onDoubleClick={()=>this.zoom(!this.state.zoomMax)}>
                <div style={this.props.hideConfirmBtn?{visibility:'hidden'}:null}>
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