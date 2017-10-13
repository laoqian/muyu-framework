import React from 'react'
import { Spin } from 'antd';

class Loding extends React.Component{

    render() {
        return (
            <div className="my-loading-wrapper">
                <div className="my-loading">
                    <Spin size="large" />
                    <span >{this.props.text}</span>
                </div>
            </div>
        )

    }
}

export default Loding;