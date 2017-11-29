import React from 'react'
import BaseComponent from './BaseComponent'
import ReactDOM from 'react-dom'
import {Modal,Input,Button,Row,Col}  from 'antd'
import  _ from 'lodash'

const Search = Input.Search;
export default class Ztree extends BaseComponent{

    static open(setting){
        let $t = new BaseComponent();
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
            submiting:false,node:null
        };

        $t.modelClose=()=>{
            let {container,rootDiv} = this.props;
            $t.zTree.destroy();
            // ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
            document.body.removeChild(rootDiv);
        };

        $t.selectNode = ()=>{
            let setting = $t.props.setting || {};
            let dbClick = setting.callback.onDblClick;
            let onOk = setting.callback.onOk;
            let treeNodeList = $t.zTree.getSelectedNodes();
            let treeNode ;

            if(!treeNodeList || treeNodeList.length===0){
                return $t.u.error('未选中节点');
            }
            if(treeNodeList.length===1){
                treeNode = treeNodeList[0];
            }

            if(dbClick){
                dbClick(null, null,treeNode);
            }else if(onOk){
                $t.modelClose();
                onOk(treeNodeList);
            }

        };
        $t.modalClick = type => type==='ok'?$t.selectNode() : $t.modelClose();

        $t.regEvent("didMount",()=>{
            let dom = ReactDOM.findDOMNode(this.refs.tree);
            let setting = this.props.setting || {};
            setting.callback = setting.callback || {};
            setting.callback.onClick =(event, treeId,treeNode) =>$t.state.node = treeNode;

            setting.leafSelOnly = setting.leafSelOnly!==false;

            let dbClick = setting.callback.onDblClick;
            setting.callback.onDblClick = (event, treeId,treeNode) =>{
                if(setting.leafSelOnly && treeNode.isParent){
                   return $t.u.error('不能选择父目录');
                }

                $t.modelClose();
                if(dbClick){
                    dbClick(event, treeId,treeNode);
                }
            };

            $.fn.zTree.init($(dom), setting,this.props.zNodes);
            $t.zTree = $.fn.zTree.getZTreeObj($t.treeId);
        });

        $t.hiddenNodes=[];

        $t.treeFilter=(_keywords)=>{
            $t.zTree.expandAll(true);
            $t.zTree.showNodes($t.hiddenNodes);

            //获取不符合条件的叶子结点
            $t.hiddenNodes = $t.zTree.getNodesByFilter(node=>!(node.isParent || node.name.indexOf(_keywords) !== -1));

            //隐藏不符合条件的叶子结点
            $t.zTree.hideNodes($t.hiddenNodes);
        };

        $t.treeId = this.u.randId();
    }

    render(){
        let {setting} = this.props;
        let bodyStyle ={};
        if(setting){
            bodyStyle = _.assign(bodyStyle,setting.modelStyle);
        }
        bodyStyle.height = bodyStyle.height ||'400px';
        bodyStyle.width  =  bodyStyle.width ||'300px';

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
                <Search placeholder="关键字" onSearch={this.treeFilter} onChange={(e)=>this.treeFilter(e.target.value)}/>
                <div ref="tree" id={this.treeId} className="ztree" />
            </Modal>
        )
    }
}