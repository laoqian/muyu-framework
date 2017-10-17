import React ,{Component} from  'react'
import {connect} from 'react-redux'
import {Tabs} from 'antd';
import {tab_delete,tab_sel} from '../redux/actions/tabs'
import {bindActionCreators} from 'redux';
import SysUser from "../modules/sys/user/list"

const TabPane = Tabs.TabPane;

class ContentWrapper extends Component {

    constructor(props){
        super(props);
        this.onEdit = this.onEdit.bind(this);
        }

    onEdit = (key, action) => {
        if(action ==='remove'){
            this.props.tab_delete({key})
        }
    }

    onTabClick = (key) => {
        this.props.tab_sel({key})
    }

    render() {
        let penes = this.props.tabs.penes;
        return (
            <Tabs
                type="editable-card"
                tabBarStyle={{'padding':'10px 10px 0 10px'}}
                activeKey={this.props.tabs.activeKey}
                hideAdd={true}
                onEdit={this.onEdit}
                onTabClick={this.onTabClick}
                animated={true}
            >
                {penes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                        <SysUser/>
                </TabPane>)}
            </Tabs>
        )
    }
}


ContentWrapper.propTypes = {

};


function mapStateToProps(state) {
    return {
        tabs:state.tabs
    }
}

function mapActionToProps(dispatch) {
    return {
        tab_delete: bindActionCreators(tab_delete, dispatch),
        tab_sel: bindActionCreators(tab_sel, dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(ContentWrapper);

