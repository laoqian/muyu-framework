import React from 'react'
import BaseComponent from './BaseComponent'
import ReactDOM from 'react-dom'
import {Modal}  from 'antd'

export default class Ztree extends BaseComponent{

    static open(setting){
        // u.get(setting.url,bean=>{
        //     if(bean.success()){
        //         let data = bean.data;
        //         render(<Ztree data={data} setting={setting}/>,
        //             document.getElementsByName('body'));
        //     }
        // })

        let zNodes = [
            {name:"test1", open:true, children:[
                {name:"test1_1"}, {name:"test1_2"}]},
            {name:"test2", open:true, children:[
                {name:"test2_1"}, {name:"test2_2"}]}
        ];

        let div = document.createElement('div'),container=document.createElement('div');
        document.body.appendChild(div);
        document.body.appendChild(container);
        ReactDOM.render(<Ztree container={container} setting={setting} rootDiv={div} zNodes={zNodes}/>,div);
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
            this.tree = $.fn.zTree.init($(dom), this.props.setting, this.props.zNodes);
        })
    }

    render(){
        let {setting} = this.props;
        let bodyStyle ;
        if(setting){
            bodyStyle = setting.modelStyle;
        }
        if(!bodyStyle){
            bodyStyle ={width:'200px',height:'400px'};
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