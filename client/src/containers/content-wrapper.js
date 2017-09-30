import React ,{Component} from  'react'
import {connect} from 'react-redux'
import {Tabs} from 'antd';
import {tab_delete} from '../actions/tabs'
import {bindActionCreators} from 'redux';

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

    render() {
        let penes = this.props.tabs.penes;
        return (
            <Tabs
                type="editable-card"
                tabBarStyle={{'padding':'10px 10px 0 10px'}}
                hideAdd={true}
                onEdit={this.onEdit}
            >
                {penes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
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
        tab_delete: bindActionCreators(tab_delete, dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(ContentWrapper);

