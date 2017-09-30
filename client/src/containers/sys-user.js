import React ,{Component} from  'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import ToolBar from '../components/tool-bar'
import {Router, Route, Link} from 'react-router-dom'


let tools = [
    {name:'添加',img:'add.png',isSplit:true},
    {name:'删除',img:'user_edit.png',isSplit:false},
    {name:'修改',img:'chart_pie.png',isSplit:false}
];


class SysUser extends Component {

    constructor(props){
        super(props);
    }

    toolClick(tool){
        console.log(tool)
    }

    render() {

        return (
            <div>
                <ToolBar tools={tools} toolClick={this.toolClick}/>
                <div> 333333 </div>
            </div>
        )
    }
}


SysUser.propTypes = {

};


function mapStateToProps(state) {
    return {
        sys_user:state.sys_user
    }
}

function mapActionToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapActionToProps)(SysUser);

