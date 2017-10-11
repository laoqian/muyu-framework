import React ,{Component} from  'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import ToolBar from '../components/tool-bar'
import {Router, Route, Link} from 'react-router-dom'


let toolBarConfig = {
    leftTools:{
        items:[
        {type:'input',},
        {type:'select',}
    ],
        searchBtn:{
            text:'查询',
            icon:'search'
        }
    },
    rightTools:{
        isReload:true,
        items:[
        {name:'添加',icon:'plus'},
        {name:'删除',icon:'delete'},
        {name:'修改',icon:'edit'}
    ]}
};


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
                <ToolBar config={toolBarConfig} toolClick={this.toolClick}/>
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

