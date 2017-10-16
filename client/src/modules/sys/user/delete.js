import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'


class UserDelete extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div  >

            </div>
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
)(UserDelete);

