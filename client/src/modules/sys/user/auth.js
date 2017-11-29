import React from 'react'
import BaseComponent from "../../base/BaseComponent"
import colModel from './colModel'
import {Form,Tree} from 'antd';

const TreeNode = Tree.TreeNode;

class AuthForm extends BaseComponent {
    constructor(props) {
        super(props);

        let $t  = this,u=this.u;

        $t.extend("Form");

        $t.state.checkedKeys =[];
        $t.state.selectedKeys =[];

        $t.baseUrl      = '/api/user/';
        $t.moduleName   = "用户角色";
        $t.colModel     = colModel;
        $t.style ={width:'400px',height:'600px'};

        $t.renderTreeNodes = (data) => {
            return data.map((item) => {
                return <TreeNode title={item.name} key={item.id} dataRef={item} isLeaf={true} />;
            });
        };

        $t.onCheck = (checkedKeys) => {
            this.setState({checkedKeys });
        };

        $t.saveData = () => {
            $t.defaultSaveData('saveUserRoleBatch', 'post', () => ({data:this.state.editData, list:this.state.checkedKeys}))
        };
    }

    render(){
        let tree = (
            <Tree
                checkable
                defaultExpandAll
                showLine
                defaultCheckedKeys={this.state.data?this.state.data.selectedKeys:[]}
                onCheck={this.onCheck}

                ref="tree"
            >
                {this.renderTreeNodes(this.u.getRoleList())}
            </Tree>
        );

        return this.renderModel(tree);
    }
}


export default Form.create()(AuthForm);

