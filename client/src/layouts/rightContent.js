import React ,{Component} from  'react'
import {connect} from 'react-redux'
import {Tabs} from 'antd';
import {tabDelete,tabSel} from '../redux/actions/tabs'
import {bindActionCreators} from 'redux';

const TabPane = Tabs.TabPane;

class ContentWrapper extends Component {

    constructor(props){
        super(props);
        this.onEdit = this.onEdit.bind(this);
        }

    onEdit = (key, action) => {
        if(action ==='remove'){
            this.props.tabDelete({key})
        }
    }

    onTabClick = (key) => {
        this.props.tabSel({key})
    }

    getPage(href){
        let Page = require('../modules'+href).default;
        return <Page/>;
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
                {penes.map(pane => <TabPane tab={pane.name} key={pane.id} closable={true}>
                    {this.getPage(pane.href)}
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
        tabDelete: bindActionCreators(tabDelete, dispatch),
        tabSel: bindActionCreators(tabSel, dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(ContentWrapper);

