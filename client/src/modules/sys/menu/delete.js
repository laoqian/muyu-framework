import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class MenuDelete extends Component {

    constructor() {
        super();

        this.state ={
            visible:false,
            loading:false
        };

        this.userDelete = ()=>{

        }
    }


    render() {

        return (
            <Modal
                title= '用户删除'
                wrapClassName="vertical-center-modal"
                visible={this.state.visible}
                okType = "danger"
                onOk ={() => this.userDelete('ok')}
                onCancel={() => this.userDelete('cancel')}
                confirmLoading ={this.state.loading}
            >
                <div>确定要删除吗？</div>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        time: state.time
    }
}

function mapActionToProps(dispatch) {
    return {
    }
}


export default connect(
    mapStateToProps,
    mapActionToProps
)(MenuDelete);

