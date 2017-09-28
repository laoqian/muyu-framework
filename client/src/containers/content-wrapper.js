import React ,{Component} from  'react'
import {connect} from 'react-redux'
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

class ContentWrapper extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(prevProps, prevState) {

    }

    render() {
        let penes = this.props.tabs.penes;
        return (
            <Tabs
                type="editable-card"
                tabBarStyle={{'padding':'10px 10px 0 10px'}}
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
    return {}
}

export default connect(mapStateToProps, mapActionToProps)(ContentWrapper);

