import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Modal,notification} from 'antd'
import moduleManaer from '../../../modules'


class MenuDelete extends Component {

    constructor() {
        super();

        this.state ={
            loading:false
        };

        this.modalClick = (type) =>{
            if (type === 'ok') {
                this.setState({submiting: true});
                this.userDelete();
            } else {
                this.props.history.push('/');
            }
        }


        this.userDelete = ()=>{
            let {row} = this.props.location;
            let self = this;

            self.setState({loading:true});

            $.get('/api/dict/delete?id=' + row.id, function (bean) {
                if (bean.code === 0) {
                    notification.success({message:bean.msg});
                    self.setState({loading:false});
                } else {
                    notification.error({message:bean.msg});
                }
            });
        }
    }

    render() {
        let {row} = this.props.location;
        let text = `确定要删除:${row.label}吗？`;

        return (
            <Modal
                title= "字典删除"
                wrapClassName= "vertical-center-modal"
                visible={true}
                okType = "danger"
                onOk ={() => this.modalClick('ok')}
                onCancel={() => this.modalClick('cancel')}
                confirmLoading ={this.state.loading}
            >
                <div>{text}</div>
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

