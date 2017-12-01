import React from 'react'
import ReactDom from 'react-dom'
import BaseComponent from './BaseComponent'
import {Select} from 'antd'
import Ztree from './Ztree'

const Option =Select.Option;

export default class ZtreeSelect extends BaseComponent{
    constructor(props){
        super(props);
        let $t = this;
        let {value} =this.props;
        $t.state.option = value?value:null;

        $t.regEvent("didMount",()=>{
            $t.select  = ReactDom.findDOMNode($t.refs.select);
            $('.ant-select-selection',$t.select).click(function(event){
                if(arguments[1]==='selected'){
                    setTimeout(()=>{
                        $('li',$t.container).trigger('click');
                    },100);
                }else{
                    if(!$(arguments[0].target).hasClass("ant-select-selection__clear")){
                        Ztree.open({url:$t.encodeBaseUrl($t.props.url),callback:{onDblClick:(event, treeId, treeNode)=>{
                            $t.setState({option:treeNode.node});
                            const onChange = $t.props.onChange;
                            if(onChange){
                                onChange(treeNode.node);
                            }
                        }}});
                    }
                }
            });

        });

        $t.regEvent("didUpdate",(prevProps,prevState)=>{
            let {option} = this.state;

            if(option!==prevState.option){
                $('.ant-select-selection',$t.select).trigger('click','selected');
            }
        });

        $t.container =  document.createElement('div');
        document.body.appendChild($t.container);
        $($t.container).hide();
    }

    componentWillUnmount(){
        document.body.removeChild(this.container);
    }
    render (){
        let {option} = this.state;

        return(
            <Select
                allowClear
                defaultValue={option?option.id.toString():null}
                ref="select"
                getPopupContainer={()=>this.container}
                placeholder={"==请选择=="}
            >
                {option?<Option key={option.id} title={option.name}>{option.name}</Option>:null}
            </Select>
        )
    }
}