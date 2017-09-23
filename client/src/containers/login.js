import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {user_auth_action} from '../actions/action'
import {bindActionCreators} from 'redux'


class Login extends Component {
    constructor() {
        super();
        this.auth = this.auth.bind(this);
    }

    auth(){
       let refs = this.refs;
       this.props.auth(refs.username.value,refs.password.value);
    }
    render() {
        return (
            <form method="post" >
                <div><label> 用户名 : <input type="text" ref="username"/> </label></div>
                <div><label> 密  码 : <input type="password" ref="password"/> </label></div>
                <div><input type="button" value="登录" onClick={this.auth}/></div>
            </form>
        )
    }
}


Login.propTypes = {
    //path: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
    return {
        time: state.time
    }
}

function mapActionToProps(dispatch) {
    return {
        auth: bindActionCreators(user_auth_action, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(Login);

