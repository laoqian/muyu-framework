import React from 'react'
import BaseComponent from './BaseComponent'
import ReactDOM from 'react-dom'
import {Modal}  from 'antd'

export default class Ztree extends BaseComponent{
    static open(setting){
        let $t = new Ztree();
        $t.u.get(setting.url,bean=>{
            if(bean.success()){
                let data = bean.data;

                let div = document.createElement('div'),container=document.createElement('div');
                document.body.appendChild(div);
                document.body.appendChild(container);
                ReactDOM.render(<Ztree container={container} setting={setting} rootDiv={div} zNodes={data}/>,div);
            }
        })
    }

    constructor(props){
        super(props);
        let $t = this;
        $t.state ={
            submiting:false,visible:true
        };

        $t.modalClick = (type) => {
            if (type === 'ok') {
                $t.setState({submiting: true});
            } else {
                let {container,rootDiv} = this.props;
                ReactDOM.unmountComponentAtNode(container);
                container.parentNode.removeChild(container);
                rootDiv.parentNode.removeChild(rootDiv);
            }
        };

        this.regEvent("didMount",()=>{
            let dom = ReactDOM.findDOMNode(this.refs.tree);
            let setting = this.props.setting || {};
            setting.callback = {
                onClick:(event, treeId, treeNode) =>console.log(treeNode)
            };
            this.tree = $.fn.zTree.init($(dom), setting,this.props.zNodes);
        })
    }

    render(){
        let {setting} = this.props;
        let bodyStyle ;
        if(setting){
            bodyStyle = setting.modelStyle;
        }
        if(!bodyStyle){
            bodyStyle ={height:'400px'};
        }
        return (
            <Modal
                title={"树形"}
                wrapClassName="vertical-center-modal"
                visible={true}
                onOk={() => this.modalClick('ok')}
                onCancel={() => this.modalClick('cancel')}
                confirmLoading={this.state.submiting}
                getContainer={()=>this.props.container}
                bodyStyle={bodyStyle}
                className="tree-wrapper"
            >
                <div ref="tree" id={this.u.randId()} className="ztree" />
            </Modal>
        )
    }
}