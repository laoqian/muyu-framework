import React from 'react'
import {connect} from 'react-redux'
import {Router, Route,IndexRoute,Switch} from 'react-router-dom'
import {findDOMNode} from 'react-dom';
import BaseComponent from "../../base/BaseComponent";

class GenTable extends BaseComponent{

    constructor(props){
        super(props);
        let $t = this;

        $t.extend("List");
        $t.baseUrl    = '/api/gen/'  ;
        $t.moduleName = 'sysGen';
        $t.history.push('/');  /*初始化时指向根目录*/
        $t.setGridInitParam({
            url:$t.encodeUrl('findPage'),
            gridName:this.moduleName
        });

        $t.toolBarOptions = {
            left: {
                items: [
                    {
                        name: 'type', type: 'input', text: '类型:', palaceHolder: '类型',
                        rules: [],
                    }
                ],
                searchBtn: {
                    text: '查询',
                    icon: 'search'
                }
            },
            reload:true,
            right:{
                items :[
                    {name: '添加',path:'/add',   icon: 'plus',    },
                    {name: '删除',path:'/delete',icon: 'delete',  },
                    {name: '修改',path:'/edit',  icon: 'edit',    },
                ]
            }
        };
    }

    render() {
        return (
            <div className="my-col-full" >
                <a href="./act/process-editor/modeler.jsp">编辑流程</a>
            </div>
        )
    }
}

const NoMatch = ({ location }) => {
    // notification.error({message:`路由匹配出错:${location.pathname}`});
    console.warn(`路由匹配出错:${location.pathname}`);
    return null;
};

function mapStateToProps(state) {
    return {
    }
}

function mapActionToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapActionToProps)(GenTable);

