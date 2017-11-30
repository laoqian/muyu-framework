import React from 'react'
import BaseComponent from "../../base/BaseComponent"
import colModel from './colModel'
import {Form,Tree} from 'antd';

const TreeNode = Tree.TreeNode;

class RoleAllcationForm extends BaseComponent {
    constructor(props) {
        super(props);

        let $t  = this,u=this.u;

        $t.extend("Form");

        $t.state.checkedKeys =[];
        $t.state.selectedKeys =[];

        $t.baseUrl      = '/api/role/';
        $t.moduleName   = "角色";
        $t.colModel     = colModel;
        $t.style ={width:'400px',height:'600px'};

        $t.renderTreeNodes = (data) => {
            return data.map((item) => {
                let node  = item.node;
                if (item.children && item.children.length>0) {
                    return (
                        <TreeNode title={node.name} key={node.id} dataRef={item}>
                            {$t.renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }else{

                    return <TreeNode title={node.name} key={node.id} dataRef={item} isLeaf={true} />;
                }
            });
        };

        $t.onCheck = (checkedKeys) => {
            this.setState({checkedKeys });
        };

        $t.saveData = () => {
            $t.defaultSaveData('saveRoleMenuBatch', 'post', () => ({data:this.state.editData, list:this.state.checkedKeys}))
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
                {this.renderTreeNodes(this.u.getMenuTree().children)}
            </Tree>
        );

        return this.renderModel(tree);
    }
}


export default Form.create()(RoleAllcationForm);

