import React from 'react'
import { Spin } from 'antd';

class Loding extends React.Component{
    render() {
        let style={};
        if(this.props.isLayerHide){
            style = {'background':'transparent'};
        }

        return (
            <div className="my-loading-wrapper" style={style}>
                <div className="my-loading">
                    <Spin size="large" />
                    <span >{this.props.text}</span>
                </div>
            </div>
        )

    }
}

export default Loding;